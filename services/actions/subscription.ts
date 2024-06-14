'use server';

import { schemas } from '@/lib';
import { emailSubscription } from '../api';

export async function subscription(prevState: any, formData: FormData) {
  const fields = {
    email: formData.get('email'),
    locale: formData.get('locale'),
    message:
      formData.get('locale') === 'uk'
        ? 'Валідаційна помилка.'
        : 'Validation error.',
  };

  const validatedData: any = schemas
    .subscription(fields.locale as string)
    .safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      strapiError: null,
      status: 400,
      message: fields.message,
    };
  }

  const response = await emailSubscription(validatedData.data);

  if (!response.message) {
    return {
      errors: null,
      strapiError: null,
      status: 400,
      message: 'Bad request',
    };
  }

  return {
    errors: null,
    strapiError: null,
    status: 200,
    message: response.message,
  };
}
