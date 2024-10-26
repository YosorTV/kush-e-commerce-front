'use server';

import { signIn, signOut } from '@/auth';
import { DEFAULT_LOCALE, ROOT } from '@/helpers/constants';
import { schemas } from '@/lib/zod';
import { AuthError } from 'next-auth';

export async function authUserAction(prevState: any, formData: FormData) {
  try {
    const fields = {
      identifier: formData.get('identifier'),
      password: formData.get('password'),
      remember: formData.get('remember') ?? 'off',
      locale: formData.get('locale') ?? 'uk'
    };

    const validatedData: any = schemas.login(fields.locale as string).safeParse(fields);

    if (!validatedData.success) {
      const errors = validatedData.error.flatten().fieldErrors;

      return {
        ...prevState,
        errors,
        strapiError: null,
        status: 400,
        message: formData.get('locale') === 'uk' ? 'Валідаційна помилка' : 'Validation error'
      };
    }

    const res = await signIn('credentials', {
      ...validatedData.data,
      redirect: true,
      redirectTo: `${ROOT}${formData.get('locale')}`
    });

    if (res) {
      return {
        ...prevState,
        data: null,
        errors: null,
        url: ROOT,
        status: 200,
        message: formData.get('locale') === 'uk' ? 'З поверненням.' : 'Welcome back.',
        strapiError: null
      };
    }

    return {
      ...prevState,
      data: null,
      errors: null,
      url: null,
      status: 400,
      message: formData.get('locale') === 'uk' ? 'Помилка авторизації.' : 'Authorization error.',
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
            message: '',
            strapiError: error.cause['err'].message ?? 'An unexpected error occurred'
          };
        default:
          return {
            ...prevState,
            data: null,
            errors: null,
            status: 400,
            message: '',
            strapiError: formData.get('locale') === 'uk' ? 'Помилка авторизації.' : 'Authorization error.'
          };
      }
    }
    throw error;
  }
}

export async function logout({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  await signOut({ redirect: true, redirectTo: `${ROOT}${locale}` });
}
