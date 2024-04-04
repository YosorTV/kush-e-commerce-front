import { SignInAdapterProps } from '@/types/adapters/auth';

export const sessionAdapter = ({ token }: any) => {
  if (!token) return null;

  return {
    accessToken: token.accessToken,
    exp: token.exp,
    user: {
      id: token.id,
      name: token.name,
      email: token.email,
      avatar: token.picture,
    },
  };
};

export const tokenAdapter = ({ token, user }: any) => {
  if (!token || !user) return null;

  token.accessToken = user?.jwt && user.jwt;
  token.name = user?.user?.username || user?.name;
  token.email = user?.user?.email || user.email;
  token.avatar = user?.image || null;
  token.id = user.id || user.sub;

  return token;
};

export const signInParamsAdapter = (credentials: SignInAdapterProps) => {
  if (!credentials) return null;

  return {
    email: credentials.email,
    password: credentials.password,
    callbackUrl: '/',
    redirect: false,
  };
};
