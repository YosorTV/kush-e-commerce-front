import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    deliveryAddress: string;
    stripeCustomerId: string;
    blocked: boolean;
    confirmed: boolean;
    provider: string;
    iat: number;
    exp: number;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      deliveryAddress: string;
      stripeCustomerId: string;
      blocked: boolean;
      confirmed: boolean;
      provider: string;
      iat: number;
      exp: number;
    };
    exp: number;
    accessToken: string;
    refreshToken: string;
  }
}
