import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin')) {
    const pwd = process.env.ADMIN_UI_PASSWORD;
    // allow API route—it already has its own auth
    if (pathname.startsWith('/admin/login') || pathname.startsWith('/admin/ai-migration') || pathname.startsWith('/api/admin')) {
      return NextResponse.next();
    }
    const token = req.cookies.get('admin_ui_password')?.value || req.headers.get('x-admin-ui-password');
    if (!pwd || token !== pwd) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
