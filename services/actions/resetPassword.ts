import { schemas } from '@/lib';
import { resetUserPassword } from '../api/reset-user-password';

export async function resetPassword(prevState: any, formData: FormData) {
  const locale = formData.get('locale') ?? 'en';

  const fields = {
    code: formData.get('code'),
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
  };

  const validatedData: any = schemas
    .resetPassword(locale as string)
    .safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      strapiError: null,
      status: 400,
      message: locale === 'uk' ? 'Валідаційна помилка.' : 'Validation error.',
    };
  }

  const response = await resetUserPassword(validatedData.data);

  if (response.error) {
    return {
      ...prevState,
      errors: null,
      status: 400,
      message: 'Bad request',
      strapiError: response.error.message,
    };
  }

  return {
    errors: null,
    strapiError: null,
    status: 200,
    message:
      locale === 'uk'
        ? 'Ви успішно змінили пароль.'
        : 'You have successfully reset your password.',
    url: '/login',
  };
}
