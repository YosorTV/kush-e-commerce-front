'use server';

export async function filter(prevState: any, formData: FormData) {
  console.log('formData: ', formData);

  return {
    ...prevState,
    errors: null,
    strapiError: null,
    status: 400,
    message: '',
  };
}
