import { postStrapiData } from '../strapi';

type ResetUserPassword = {
  code: string;
  password: string;
  passwordConfirmation: string;
};

export async function resetUserPassword(props: ResetUserPassword) {
  const data = await postStrapiData('auth/reset-password', props);

  return data;
}
