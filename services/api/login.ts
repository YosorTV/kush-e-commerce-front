import { postStrapiData } from '../strapi';

interface LoginUserProps {
  identifier: string;
  password: string;
}

export async function login(user: LoginUserProps) {
  const data = await postStrapiData('auth/local', user);

  return data;
}
