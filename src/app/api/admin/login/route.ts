import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as any));
  const password = body?.password as string | undefined;
  const ADMIN_UI_PASSWORD = process.env.ADMIN_UI_PASSWORD || '';
  if (!ADMIN_UI_PASSWORD) return NextResponse.json({ error: 'Server missing ADMIN_UI_PASSWORD' }, { status: 500 });
  if (!password) return NextResponse.json({ error: 'Missing password' }, { status: 400 });
  if (password !== ADMIN_UI_PASSWORD) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  // Set cookie valid for 7 days
  res.cookies.set('admin_ui_password', password, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
