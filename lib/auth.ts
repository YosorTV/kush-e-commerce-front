import { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';
// import { getStrapiAuthData } from '@/services/strapi';
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
      authorize: async (credentials: any) => {
        const res = await login(credentials);

        if (res?.jwt) {
          return res;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
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
