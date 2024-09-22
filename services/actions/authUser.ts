'use server';

import { schemas } from '@/lib/zod';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { signInParamsAdapter } from '@/adapters/auth';
import { ROOT } from '@/helpers/constants';
import { revalidatePath } from 'next/cache';

export async function authUserAction(prevState: any, formData: FormData) {
  try {
    const fields = {
      identifier: formData.get('identifier'),
      password: formData.get('password'),
      remember: formData.get('remember') || 'off',
      locale: formData.get('locale') || 'uk'
    };

    const validatedData: any = schemas.login(fields.locale as string).safeParse(fields);

    if (!validatedData.success) {
      const errors = validatedData.error.flatten().fieldErrors;

      return {
        ...prevState,
        errors,
        strapiError: null,
        status: 400,
        message: fields.locale === 'uk' ? 'Валідаційна помилка.' : 'Validation error.'
      };
    }

    const result = await signIn('credentials', signInParamsAdapter(validatedData.data));
    if (result) {
      revalidatePath('/');

      return {
        ...prevState,
        status: 200,
        url: ROOT,
        message: formData.get('locale') === 'uk' ? 'З поверненням.' : 'Welcome back.',
        strapiError: null
      };
    }
    return {
      ...prevState,
      status: 200,
      message: null,
      strapiError: null
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
          return {
            ...prevState,
            data: null,
            errors: null,
            status: 400,
            message: formData.get('locale') === 'uk' ? 'Помилка запиту.' : 'Bad Request.',
            strapiError: error?.cause?.['err'].message
          };
        default:
          return {
            ...prevState,
            data: null,
            errors: null,
            status: 400,
            message: formData.get('locale') === 'uk' ? 'Помилка запиту.' : 'Bad Request.',
            strapiError: error.message ?? 'An unexpected error occurred'
          };
      }
    }
    return {
      ...prevState,
      data: null,
      errors: error,
      status: 400,
      message: formData.get('locale') === 'uk' ? 'Помилка запиту.' : 'Bad Request.',
      strapiError: error.message ?? 'An unexpected error occurred'
    };
  }
}

export async function logout() {
  await signOut();
}
