import { schemas } from '@/lib';
import { forgotUserPassword } from '../api/forgot-user-password';

export async function forgotPassword(prevState: any, formData: FormData) {
  const fields = { email: formData.get('email') };
  const validatedData: any = schemas['forgot-password'].safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      strapiError: null,
      message: 'Missing Fields. Failed to send request.',
    };
  }

  const response = await forgotUserPassword(validatedData.data);

  if (response.error) {
    return {
      ...prevState,
      errors: null,
      message: 'Bad request',
      strapiError: response.error.message,
    };
  }

  return {
    errors: null,
    strapiError: null,
    data: 'ok',
    message: 'Reset message was send to your email address',
  };
}