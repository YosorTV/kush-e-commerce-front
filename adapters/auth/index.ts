import jwt from 'jsonwebtoken';

import { SignInAdapterProps } from '@/types/adapters/auth';

export const sessionAdapter = ({ token }: any) => {
  if (!token) return null;

  if (token.provider === 'google') {
    return {
      accessToken: token.accessToken,
      exp: token.exp,
      user: {
        id: token.id,
        name: token.name,
        email: token.email,
        picture: token.picture
      }
    };
  }

  const decodedTokenData = jwt.decode(token.accessToken) as any;

  return {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    exp: token.expires ?? token.exp,
    user: { ...decodedTokenData, name: token.name }
  };
};

export const tokenAdapter = ({ token, user }: any) => {
  if (!user) return null;

  const decodedTokenData = jwt.decode(user.jwt.accessToken) as any;

  if (decodedTokenData) {
    token.accessToken = user.jwt.accessToken;
    token.refreshToken = user.jwt.refreshToken;
    token.expires = decodedTokenData.exp;
    token.name = user.username;
    token.picture = user.picture;
    token.id = user.id;
    token.email = user.email || decodedTokenData.email;

    return token;
  }

  return null;
};

export const googleTokenAdapter = ({ token, user }: any) => {
  token.accessToken = user.jwt;
  token.id = user.user.id;
  token.provider = user.user.provider;
  token.email = user.user.email;

  return token;
};

export const signInParamsAdapter = (credentials: SignInAdapterProps) => {
  if (!credentials) return null;

  return {
    email: credentials.email,
    password: credentials.password,
    callbackUrl: '/',
    redirect: false
  };
};
