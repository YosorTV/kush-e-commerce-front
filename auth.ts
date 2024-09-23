import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider, { CredentialInput } from 'next-auth/providers/credentials';

import { googleTokenAdapter, sessionAdapter, tokenAdapter } from '@/adapters/auth';

import { strapiProviderLogin, login } from '@/services';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST }
} = NextAuth({
  trustHost: true,
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET || '81l3XFFjNE2TVjN9LS0ZuiPaTC8UqaR4',
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
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
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
            options: { ...token, access_token: account.access_token }
          });

          if (response?.exist) {
            return tokenAdapter({ token, user: response });
          }

          return googleTokenAdapter({ token, user: response });
        }
      }

      return token;
    },
    async session({ token, session }: any) {
      session = sessionAdapter({ token });

      return session;
    }
  }
});
