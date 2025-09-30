import { NextRequest, NextResponse } from 'next/server';
import { logAdminEvent } from '@/lib/adminAudit';
import { verifyAdminSession } from '@/lib/security';

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 });
  const token = req.cookies.get('admin_session')?.value || '';
  let jti: string | null = null;
  if (token) {
    const payload = await verifyAdminSession(token);
    jti = payload?.jti || null;
  }
  await logAdminEvent({
    event: 'admin_logout',
    ip_hash: null,
    ip_raw: null,
    user_agent: req.headers.get('user-agent'),
    jti,
    meta: null,
  });
  return res;
}
