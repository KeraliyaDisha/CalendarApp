import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function for global authentication check
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  if (!token && req.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  if (token && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  return NextResponse.next();
}

// Middleware configuration to apply on relevant routes
export const config = {
  matcher: ['/', '/home/:path*', '/auth/:path*'],
};