import { generateStrapiQuery } from '@/lib';
import { getStrapiData, postStrapiData } from '../strapi';

export const strapiProviderLogin = async ({ provider, options }: any) => {
  const { access_token, email } = options;

  const response = await getStrapiData(`auth/${provider}/callback`, generateStrapiQuery({ access_token }));

  if (response.status === 400) {
    const user = await postStrapiData('find-user', { email });

    return user;
  }

  return response;
};
