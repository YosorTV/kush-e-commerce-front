import { STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export async function getForgotPasswordData({ locale }: { locale: string }) {
  const forgotQP = STRAPI_QUERIES.AUTH({ locale }).forgot;

  const response = await getStrapiData(STRAPI_ENTRIES.forgot, generateStrapiQuery(forgotQP));

  return { data: response };
}
