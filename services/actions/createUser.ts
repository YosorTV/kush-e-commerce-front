'use server';

import { schemas } from '@/lib/zod';
import { createUser } from '../api/create-user';
import { redirect } from 'next/navigation';

export async function createUserAction(prevState: any, formData: FormData) {
  const fields = {
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
  };

  const validatedData: any = schemas.signup.safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      strapiError: null,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  const response = await createUser(validatedData.data);

  if (response.error) {
    return {
      ...prevState,
      errors: null,
      message: 'Bad request',
      strapiError: response.error.message,
    };
  }

  redirect('/login');
}
