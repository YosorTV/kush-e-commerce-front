import cookie from 'js-cookie';
import { NextApiRequest } from 'next';

export const setCookie = (key: string, value: string) => {
  cookie.set(key, value, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    expires: 1,
  });
};

export const removeCookie = (key: string) => {
  cookie.remove(key, {
    expires: 0,
  });
};

export const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

export const getCookieFromServer = (key: string, req: NextApiRequest) => {
  if (!req.headers?.cookie) {
    return undefined;
  }

  const rawCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`));

  if (!rawCookie) {
    return undefined;
  }

  return rawCookie.split('=')[1];
};
