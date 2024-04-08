import { schemas } from '@/lib';
import { resetUserPassword } from '../api/reset-user-password';

export async function resetPassword(prevState: any, formData: FormData) {
  const fields = {
    code: formData.get('code'),
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
  };

  console.log({ fields });

  const validatedData: any = schemas['reset-password'].safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      strapiError: null,
      message: 'Missing Fields. Failed to reset password.',
    };
  }

  const response = await resetUserPassword(validatedData.data);

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
    message: 'You have successfully reset your password!',
    redirectUrl: '/login',
  };
}
