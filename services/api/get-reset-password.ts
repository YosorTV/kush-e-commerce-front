import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';
import { notFound } from 'next/navigation';
import { STRAPI_QUERIES } from '../queries';
import { STRAPI_PAGES } from '@/helpers/constants';

export async function getResetPasswordData({ locale }: { locale: string }) {
  const resetQP = STRAPI_QUERIES.AUTH({ locale }).reset;

  const response = await getStrapiData(
    STRAPI_PAGES.reset,
    generateStrapiQuery(resetQP)
  );

  if (!response.id) notFound();

  return { data: response };
}