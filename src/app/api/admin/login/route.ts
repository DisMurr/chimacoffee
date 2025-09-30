import { NextRequest, NextResponse } from 'next/server';
import { createRateLimiter, ipKey } from '@/lib/rateLimit';
import { createAdminPayload, signAdminSession } from '@/lib/security';

const limiter = createRateLimiter({ capacity: 5, refillPerSec: 0.2 }); // burst 5, 1 req / 5s

export async function POST(req: NextRequest) {
  const rate = limiter.take(ipKey(req, 'admin:login'));
  if (!rate.allowed) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  const body = await req.json().catch(() => ({} as any));
  const password = body?.password as string | undefined;
  const ADMIN_UI_PASSWORD = process.env.ADMIN_UI_PASSWORD || '';
  if (!ADMIN_UI_PASSWORD) return NextResponse.json({ error: 'Server missing ADMIN_UI_PASSWORD' }, { status: 500 });
  if (!password) return NextResponse.json({ error: 'Missing password' }, { status: 400 });
  if (password !== ADMIN_UI_PASSWORD) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });

  const payload = createAdminPayload(60 * 60 * 24 * 7); // 7 days
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
  return res;
}
