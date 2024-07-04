import { schemas } from '@/lib';

import { forgotUserPassword } from '../api/forgot-user-password';

export async function forgotPassword(prevState: any, formData: FormData) {
  const locale = formData.get('locale') || 'uk';

  const fields = { email: formData.get('email') };

  const validatedData: any = schemas
    .forgotUserPassword(locale as string)
    .safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      strapiError: null,
      status: 400,
      message: locale === 'uk' ? 'Валідаційна помилка.' : 'Validation error',
    };
  }

  const response = await forgotUserPassword(validatedData.data);
  console.log('response: ', response);

  // if (response.error) {
  //   return {
  //     ...prevState,
  //     errors: null,
  //     status: 400,
  //     message: fields.message,
  //     strapiError: response.error.message,
  //   };
  // }

  return {
    ...prevState,
    errors: null,
    strapiError: null,
    status: 400,
    message:
      locale === 'uk'
        ? 'Повідомлення для поновлення паролю, було надіслано на вашу електронну адресу'
        : 'Reset message was send to your email address',
  };
}
