import { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';
import { getStrapiAuthData, postStrapiData } from '@/services/strapi';
import { login } from '@/services/api/login';
import { sessionAdapter, tokenAdapter } from '@/adapters/auth';

export const authOptions: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
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
          return null;
        }

        return response;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    async signIn({ account, user }) {
      if (account.access_token) {
        const response = await postStrapiData('user-check', {
          email: user.email,
        });
        if (!response.isExist) {
          await getStrapiAuthData({
            provider: account.provider,
            token: account.access_token,
          });
        }
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return tokenAdapter({ token, user });
      return Promise.resolve(token);
    },
    async session({ token, session }: any) {
      if (token) return sessionAdapter({ token });
      return Promise.resolve(session);
    },
  },
};
