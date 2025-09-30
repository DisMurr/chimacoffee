import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createRateLimiter, ipKey } from '@/lib/rateLimit';

const limiter = createRateLimiter({ capacity: 5, refillPerSec: 0.5 }); // ~1 req / 2s, burst 5
const BodySchema = z.object({
  prompt: z.string().min(10),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const rate = limiter.take(ipKey(req, 'admin:ai-migration'));
    if (!rate.allowed) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });

    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid request body', details: parsed.error.flatten() }, { status: 400 });
    const { prompt, password } = parsed.data;
    const ADMIN_UI_PASSWORD = process.env.ADMIN_UI_PASSWORD || '';
    if (!ADMIN_UI_PASSWORD || password !== ADMIN_UI_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

  const token = process.env.GITHUB_ACTIONS_TOKEN || process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO || 'DisMurr/chimacoffee';
    if (!token) {
      return NextResponse.json({ error: 'Missing GitHub token on server' }, { status: 500 });
    }

    const url = `https://api.github.com/repos/${repo}/actions/workflows/ai-migration.yml/dispatches`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ref: 'main', inputs: { prompt } }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return NextResponse.json({ error: `GitHub dispatch failed (${res.status}): ${text}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}
