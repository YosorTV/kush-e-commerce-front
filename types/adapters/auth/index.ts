import { JWT } from 'next-auth/jwt';

type UserDataProps = {
  jwt: JWT;
  id: string;
  user: {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    id: number;
  };
};

export type TokenAdapterProps = {
  token: JWT;
  user: UserDataProps;
};

export type SessionAdapterProps = {
  token: UserDataProps | any;
};

export type SignInAdapterProps = {
  email: string;
  password: string;
};
