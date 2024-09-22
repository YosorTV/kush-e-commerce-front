import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { STRAPI_PAGES } from '@/helpers/constants';

export async function getForgotPasswordData({ locale }: { locale: string }) {
  const forgotQP = STRAPI_QUERIES.AUTH({ locale }).forgot;

  const response = await getStrapiData(STRAPI_PAGES.forgot, generateStrapiQuery(forgotQP));

  return { data: response };
}
