import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { auth } from '@/auth';

import {
  LOCALES,
  LOCALES_PREFIX,
  PRIVATE_ROUTES,
  ROOT,
} from '@/helpers/constants';

const intlMiddleware = createIntlMiddleware({
  defaultLocale: 'uk',
  locales: LOCALES,
  localePrefix: LOCALES_PREFIX,
});

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPrivateRoute = PRIVATE_ROUTES.includes(nextUrl.pathname);

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(ROOT, nextUrl));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/', '/(uk|en)/:path*'],
};
