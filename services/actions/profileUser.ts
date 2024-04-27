import { schemas } from '@/lib';

export async function updateProfileAction(prevState: any, formData: FormData) {
  const fields = Object.fromEntries(formData);

  const validatedData: any = schemas.profile.safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      strapiError: null,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  return {
    ...prevState,
    message: 'Profile Updated',
    data: null,
    strapiErrors: null,
  };
}
