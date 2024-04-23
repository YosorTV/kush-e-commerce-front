import { postStrapiData } from '../strapi';

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
  confirmed: boolean;
}

export async function createUser(user: RegisterUserProps) {
  const data = await postStrapiData('auth/local/register', user);

  return data;
}
