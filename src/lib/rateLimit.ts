type Key = string;

interface Bucket {
  tokens: number;
  last: number; // ms epoch
}

// Simple token bucket per key in-memory. Survives within a single server instance only.
export function createRateLimiter({ capacity, refillPerSec }: { capacity: number; refillPerSec: number }) {
  const buckets = new Map<Key, Bucket>();

  function take(key: Key, tokens = 1) {
    const now = Date.now();
    let b = buckets.get(key);
    if (!b) {
      b = { tokens: capacity, last: now };
      buckets.set(key, b);
    }
    // refill based on elapsed time
    const elapsedSec = Math.max(0, (now - b.last) / 1000);
    const refill = elapsedSec * refillPerSec;
    b.tokens = Math.min(capacity, b.tokens + refill);
    b.last = now;

    if (b.tokens >= tokens) {
      b.tokens -= tokens;
      return { allowed: true } as const;
    }
    const needed = tokens - b.tokens;
    const waitSec = needed / refillPerSec;
    return { allowed: false, retryAfter: Math.ceil(waitSec) } as const;
  }

  return { take };
}

export function ipKey(req: Request, extra: string) {
  const ip =
    // x-forwarded-for may contain list; use first
    (req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()) ||
    req.headers.get('x-real-ip') ||
    // Next.js specific
    (req as any).ip ||
    'unknown';
  return `${ip}:${extra}`;
}
