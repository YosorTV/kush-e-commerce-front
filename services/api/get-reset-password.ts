import { STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export async function getResetPasswordData({ locale }: { locale: string }) {
  const resetQP = STRAPI_QUERIES.AUTH({ locale }).reset;

  const response = await getStrapiData(STRAPI_ENTRIES.reset, generateStrapiQuery(resetQP));

  return { data: response };
}
