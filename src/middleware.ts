import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminSession, hashUserAgent } from '@/lib/security';

export function middleware(req: NextRequest) {
  // Canonical host redirect
  const canonicalRaw = process.env.CANONICAL_HOST; // e.g., www.chimacoffee.com or https://www.chimacoffee.com
  const host = req.headers.get('host') || '';
  const accept = req.headers.get('accept') || '';
  const method = req.method || 'GET';
  const isHtmlNav = accept.includes('text/html') && method === 'GET';
  const canonical = canonicalRaw
    ? canonicalRaw.replace(/^https?:\/\//, '').split('/')[0]
    : undefined;
  if (canonical && host && host !== canonical && isHtmlNav) {
    // Avoid redirect loops for localhost/dev
    const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1');
    if (!isLocal) {
      const url = new URL(req.nextUrl.toString());
      url.host = canonical;
      url.protocol = 'https:';
      return NextResponse.redirect(url, 301);
    }
  }

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
      // Optional denylist by JTI
      const deny = (process.env.ADMIN_JTI_DENYLIST || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (deny.length && deny.includes(payload.jti)) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
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
