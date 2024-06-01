export async function subscribeNewsLetter(prevState: any, formData: FormData) {
  const fields = { email: formData.get('email') };

  return {
    ...prevState,
    ...fields,
  };
}
