import { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';

import {
  googleTokenAdapter,
  sessionAdapter,
  tokenAdapter,
} from '@/adapters/auth';

import { strapiProviderLogin, login } from '@/services';
import { postStrapiData } from '@/services/strapi';

export const authOptions: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    CredentialProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {} as Record<string, CredentialInput>,
      async authorize(credentials: any) {
        const response = await login(credentials);

        if (!response?.jwt) {
          throw new Error(response.error, { cause: 'auth' });
        }

        return response;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        if (account.provider === 'credentials') {
          return tokenAdapter({ token, user });
        }

        if (account.provider === 'google') {
          const response = await strapiProviderLogin({
            provider: account.provider,
            options: { ...token, access_token: account.access_token },
          });

          if (response.status === 400) {
            const existedUser = await postStrapiData('user-check', {
              email: user.email,
            });

            return tokenAdapter({ token, user: existedUser });
          }

          return googleTokenAdapter({ token, user: response });
        }
      }

      return Promise.resolve(token);
    },
    async session({ token, session }: any) {
      if (token) {
        return sessionAdapter({ token });
      }

      return Promise.resolve(session);
    },
  },
};
