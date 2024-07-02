'use server';

import { schemas } from '@/lib/zod';
import { createUser } from '../api/create-user';

export async function createUserAction(prevState: any, formData: FormData) {
  const fields = {
    locale: formData.get('locale'),
    email: formData.get('email'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phoneNumber: formData.get('phoneNumber'),
    password: formData.get('password'),
    username: formData.get('firstName') + ' ' + formData.get('lastName'),
  };

  const validatedData: any = schemas
    .signup(fields.locale as string)
    .safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      strapiError: null,
      status: 400,
      message:
        fields.locale === 'uk'
          ? 'Валідаційна помилка. Реестрація невдала.'
          : 'Validation error. Failed to signup.',
    };
  }

  const response = await createUser({
    ...validatedData.data,
    confirmed: false,
  });

  if (response?.user) {
    return {
      ...prevState,
      status: 200,
      errors: null,
      strapiError: null,
      url: '/login',
      message:
        fields.locale === 'uk'
          ? 'Перевірте пошту для верифікації.'
          : 'Check your email address for verification.',
    };
  } else {
    return {
      ...prevState,
      status: response.status ?? 400,
      errors: null,
      strapiError: response?.message ?? '',
      message: response.error ?? 'Authorization error',
    };
  }
}
