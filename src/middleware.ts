import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminSession, hashUserAgent } from '@/lib/security';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin')) {
    const pwd = process.env.ADMIN_UI_PASSWORD;
    // allow API route—it already has its own auth
    if (pathname.startsWith('/admin/login') || pathname.startsWith('/admin/ai-migration') || pathname.startsWith('/api/admin')) {
      return NextResponse.next();
    }
    const token = req.cookies.get('admin_session')?.value || '';
    if (!pwd || !token) return new NextResponse('Unauthorized', { status: 401 });
    // Verify signature and expiry; if invalid -> 401
    // Note: verifyAdminSession will read ADMIN_SESSION_SECRET
    // We cannot await in middleware sync, but Next middleware supports async
    // so we convert function to async by returning a Promise
    return (async () => {
      const payload = await verifyAdminSession(token);
      if (!payload) return new NextResponse('Unauthorized', { status: 401 });
      // Optional UA binding check
      if (payload.ua) {
        const currentUa = await hashUserAgent(req.headers.get('user-agent'));
        if (currentUa !== payload.ua) return new NextResponse('Unauthorized', { status: 401 });
      }
      return NextResponse.next();
    })() as any;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
