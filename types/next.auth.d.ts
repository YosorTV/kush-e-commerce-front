import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
    warehouse: string;
    cityID: string;
    warehouseID: string;
    blocked: boolean;
    confirmed: boolean;
    provider: string;
    iat: number;
    exp: number;
    createdAt: string;
    updatedAt: string;
  }

  interface Session {
    data: User;
    exp: number;
    accessToken: string;
    refreshToken: string;
  }
}
