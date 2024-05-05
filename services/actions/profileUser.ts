import { schemas } from '@/lib';

export async function updateProfileAction(prevState: any, formData: FormData) {
  const fields = Object.fromEntries(formData);

  const validatedData: any = schemas.profile.safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      status: 400,
      strapiError: null,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  return {
    ...prevState,
    message: 'Your profile was updated',
    status: 200,
    data: null,
    strapiErrors: null,
  };
}
