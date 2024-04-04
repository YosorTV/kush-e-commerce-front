import { signIn } from 'next-auth/react';

export const updateSession = async (newSession: Record<string, any>) => {
  await signIn('credentials', newSession);
};
