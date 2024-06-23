import { STRAPI_API_ROUTES } from '@/helpers/constants';

import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';
import { notFound } from 'next/navigation';

export async function getSignUpData({ locale }: { locale: string }) {
  const signUpApi = STRAPI_API_ROUTES.auth({ locale }).registration;

  const response = await getStrapiData(
    'registration-page',
    generateStrapiQuery(signUpApi)
  );

  if (!response.id) notFound();

  return { data: response };
}
