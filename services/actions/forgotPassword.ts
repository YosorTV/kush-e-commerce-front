import { schemas } from '@/lib';
import { forgotUserPassword } from '../api/forgot-user-password';

export async function forgotPassword(prevState: any, formData: FormData) {
  const fields = {
    email: formData.get('email'),
    locale: formData.get('locale'),
    message:
      formData.get('locale') === 'uk'
        ? 'Валідаційна помилка.'
        : 'Validation error.',
  };

  const validatedData: any = schemas['forgot-password'](
    fields.locale as string
  ).safeParse(fields);

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

  const response = await forgotUserPassword(validatedData.data);

  if (response.error) {
    return {
      ...prevState,
      errors: null,
      status: 400,
      message: fields.message,
      strapiError: response.error.message,
    };
  }

  return {
    errors: null,
    strapiError: null,
    status: 200,
    message:
      fields.locale === 'uk'
        ? 'Повідомлення для поновлення паролю, було надіслано на вашу електронну адресу'
        : 'Reset message was send to your email address',
  };
}
