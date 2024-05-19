import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';
import { STRAPI_API_ROUTES } from '@/helpers/constants';

export const getLayoutData = async ({ locale }: { locale: string }) => {
  const query = generateStrapiQuery(STRAPI_API_ROUTES.global({ locale }));

  const response = await getStrapiData('global', query);

  return response;
};
