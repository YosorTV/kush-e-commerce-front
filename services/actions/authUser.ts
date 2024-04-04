'use server';

import { schemas } from '@/lib/zod';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function authUserAction(prevState: any, formData: FormData) {
  try {
    const fields = {
      identifier: formData.get('identifier'),
      password: formData.get('password'),
    };

    const validatedData: any = schemas.login.safeParse(fields);

    if (!validatedData.success) {
      const errors = validatedData.error.flatten().fieldErrors;

      return {
        ...prevState,
        errors,
        strapiErrors: null,
        message: 'Missing Fields. Failed to Login.',
      };
    }

    await signIn('credentials', { ...validatedData.data, redirectTo: '/' });

    return {
      ...prevState,
      errors: null,
      strapiErrors: null,
      data: 'ok',
      message: 'Welcome back!',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'credentials error',
            errors: {
              ...prevState,
              credentials: 'incorrect email or password',
            },
          };
        default:
          return {
            message: 'unknown error',
            errors: {
              ...prevState,
              unknown: 'unknown error',
            },
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}
