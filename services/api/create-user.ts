import { postStrapiData } from '../strapi';

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

export async function createUser(user: RegisterUserProps) {
  const data = await postStrapiData('auth/local/register', user);

  return data;
}
