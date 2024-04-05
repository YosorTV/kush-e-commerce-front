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
        strapiError: null,
        message: 'Missing Fields. Failed to Login.',
      };
    }

    await signIn('credentials', { ...validatedData.data, redirectTo: '/' });

    return {
      ...prevState,
      errors: null,
      strapiError: null,
      data: 'ok',
      message: 'Welcome back!',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            ...prevState,
            data: null,
            errors: null,
            message: 'Credentials error',
            strapiError: 'Invalid credentials or provider authentication',
          };
        default:
          return {
            ...prevState,
            data: null,
            errors: null,
            message: 'Bad request',
            strapiError: 'Something went wrong',
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}
