import { postStrapiData } from '../strapi';

export async function forgotUserPassword(email: string) {
  const data = await postStrapiData('auth/forgot-password', email);

  return data;
}
