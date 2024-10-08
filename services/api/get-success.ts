import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { STRAPI_PAGES } from '@/helpers/constants';

export async function getSuccessData({ locale }: { locale: string }) {
  const successQP = STRAPI_QUERIES.AUTH({ locale }).success;

  const response = await getStrapiData(STRAPI_PAGES.success, generateStrapiQuery(successQP));

  return { data: response };
}
