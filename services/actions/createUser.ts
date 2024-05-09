'use server';

import { schemas } from '@/lib/zod';
import { createUser } from '../api/create-user';
import { redirect } from '@/lib/navigation';

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
      status: 400,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  const response = await createUser({
    ...validatedData.data,
    confirmed: false,
  });

  if (response.error) {
    return {
      ...prevState,
      errors: null,
      message: `Bad request! ${response.error}`,
      status: response.error.status,
      strapiError: response.error.message,
    };
  }

  redirect('/login');
}
