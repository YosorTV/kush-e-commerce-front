import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { PRIVATE_ROUTES, ROOT } from '@/helpers/constants';

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPrivateRoute = PRIVATE_ROUTES.includes(nextUrl.pathname);

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(ROOT, nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
