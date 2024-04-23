import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    id: number;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
    accessToken: string;
  }
}
