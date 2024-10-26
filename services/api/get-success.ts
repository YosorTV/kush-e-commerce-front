import { STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export async function getSuccessData({ locale }: { locale: string }) {
  const successQP = STRAPI_QUERIES.AUTH({ locale }).success;

  const response = await getStrapiData(STRAPI_ENTRIES.success, generateStrapiQuery(successQP));

  return { data: response };
}
