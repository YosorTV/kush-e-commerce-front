import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
