import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';
import { notFound } from 'next/navigation';
import { STRAPI_QUERIES } from '../queries';
import { STRAPI_PAGES } from '@/helpers/constants';

export async function getSignInData({ locale }: { locale: string }) {
  const signInQP = STRAPI_QUERIES.AUTH({ locale }).login;

  const response = await getStrapiData(
    STRAPI_PAGES.signin,
    generateStrapiQuery(signInQP)
  );

  if (!response.id) notFound();

  return { data: response };
}
