import { postStrapiData } from '../strapi';

interface LoginUserProps {
  identifier: string;
  password: string;
  remember: string;
  localse: string;
}

export async function login(user: LoginUserProps) {
  const data = await postStrapiData('sign-in', user);

  return data;
}
