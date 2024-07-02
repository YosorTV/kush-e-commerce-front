import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';
import { notFound } from 'next/navigation';
import { STRAPI_QUERIES } from '../queries';
import { STRAPI_PAGES } from '@/helpers/constants';

export async function getSignUpData({ locale }: { locale: string }) {
  const signUpQP = STRAPI_QUERIES.AUTH({ locale }).registration;

  const response = await getStrapiData(
    STRAPI_PAGES.signup,
    generateStrapiQuery(signUpQP)
  );

  if (!response.id) notFound();

  return { data: response };
}
