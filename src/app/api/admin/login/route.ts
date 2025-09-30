import { NextRequest, NextResponse } from 'next/server';
import { createRateLimiter, ipKey } from '@/lib/rateLimit';
import { createAdminPayload, signAdminSession, hashUserAgent } from '@/lib/security';
import { logAdminEvent } from '@/lib/adminAudit';
// Failed login tracking (salted IP hash) in-memory
type FailInfo = { count: number; first: number; last: number };
const FAILS = new Map<string, FailInfo>();
const THRESHOLD = 3; // attempts
const WINDOW_SEC = 15 * 60; // 15 minutes
const EXPIRE_SEC = 24 * 60 * 60; // 24 hours

function getIp(req: NextRequest) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    (req as any).ip ||
    'unknown'
  );
}

async function hashIp(ip: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || 'local-dev-salt';
  const data = new TextEncoder().encode(`${secret}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(digest);
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function keyForReq(req: NextRequest) {
  const ip = getIp(req);
  return hashIp(ip);
}

function prune() {
  const now = Math.floor(Date.now() / 1000);
  const keys = Array.from(FAILS.keys());
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const v = FAILS.get(k)!;
    if (now - v.last > EXPIRE_SEC) FAILS.delete(k);
  }
}

async function recordFailure(req: NextRequest) {
  prune();
  const key = await keyForReq(req);
  const now = Math.floor(Date.now() / 1000);
  const cur = FAILS.get(key);
  if (!cur) FAILS.set(key, { count: 1, first: now, last: now });
  else FAILS.set(key, { count: cur.count + 1, first: cur.first, last: now });
}

async function resetFailures(req: NextRequest) {
  const key = await keyForReq(req);
  FAILS.delete(key);
}

async function captchaRequired(req: NextRequest) {
  prune();
  const key = await keyForReq(req);
  const now = Math.floor(Date.now() / 1000);
  const info = FAILS.get(key);
  if (!info) return false;
  if (now - info.first > WINDOW_SEC) {
    FAILS.delete(key);
    return false;
  }
  return info.count >= THRESHOLD;
}

async function verifyHCaptcha(token: string | undefined, req: NextRequest) {
  if (!token) return false;
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) return false;
  const ip = getIp(req);
  const params = new URLSearchParams({ secret, response: token });
  if (ip && ip !== 'unknown') params.set('remoteip', ip);
  try {
    const resp = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = (await resp.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

const limiter = createRateLimiter({ capacity: 5, refillPerSec: 0.2 }); // burst 5, 1 req / 5s

export async function POST(req: NextRequest) {
  // CSRF defense-in-depth: check Origin if provided
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (origin && host && !origin.endsWith(host)) {
    return NextResponse.json({ error: 'Bad origin' }, { status: 403 });
  }
  const rate = limiter.take(ipKey(req, 'admin:login'));
  if (!rate.allowed) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  const body = await req.json().catch(() => ({} as any));
  const password = body?.password as string | undefined;
  const captchaToken = body?.hcaptcha as string | undefined;
  const ADMIN_UI_PASSWORD = process.env.ADMIN_UI_PASSWORD || '';
  if (!ADMIN_UI_PASSWORD) return NextResponse.json({ error: 'Server missing ADMIN_UI_PASSWORD' }, { status: 500 });
  if (!password) return NextResponse.json({ error: 'Missing password' }, { status: 400 });
  if (await captchaRequired(req)) {
    const ok = await verifyHCaptcha(captchaToken, req);
    if (!ok) {
      const sitekey = process.env.HCAPTCHA_SITEKEY || null;
      await logAdminEvent({
        event: 'admin_login_failure',
        ip_hash: await keyForReq(req),
        ip_raw: getIp(req),
        user_agent: req.headers.get('user-agent'),
        jti: null,
        meta: { reason: 'captcha_failed' },
      });
      // Do not increment failures here; CAPTCHA gate
      return NextResponse.json({ error: 'captcha-required', sitekey }, { status: 403 });
    }
  }
  if (password !== ADMIN_UI_PASSWORD) {
    await recordFailure(req);
    // Exponential backoff between 500-1500ms * attempts factor
    const key = await keyForReq(req);
    const info = FAILS.get(key);
    const attempt = info?.count || 1;
    const base = 500 + Math.floor(Math.random() * 1000);
    const delay = Math.min(5000, base * Math.min(5, attempt));
    await new Promise((r) => setTimeout(r, delay));
    await logAdminEvent({
      event: 'admin_login_failure',
      ip_hash: await keyForReq(req),
      ip_raw: getIp(req),
      user_agent: req.headers.get('user-agent'),
      jti: null,
      meta: { reason: 'bad_password' },
    });
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  await resetFailures(req);
  const uaHash = await hashUserAgent(req.headers.get('user-agent'));
  const payload = createAdminPayload(60 * 60 * 24 * 7, uaHash); // 7 days
  const token = await signAdminSession(payload);
  const res = NextResponse.json({ ok: true });
  // Set cookie valid for 7 days
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  await logAdminEvent({
    event: 'admin_login_success',
    ip_hash: await keyForReq(req),
    ip_raw: getIp(req),
    user_agent: req.headers.get('user-agent'),
    jti: payload.jti,
    meta: null,
  });
  return res;
}

export async function GET(req: NextRequest) {
  const required = await captchaRequired(req);
  const sitekey = required ? process.env.HCAPTCHA_SITEKEY || null : null;
  return NextResponse.json({ captcha: required, sitekey });
}
