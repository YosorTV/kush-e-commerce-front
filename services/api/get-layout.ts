import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';
import {} from '@/helpers/constants';
import { STRAPI_QUERIES } from '../queries';

export const getLayoutData = async ({ locale }: { locale: string }) => {
  const globalQP = generateStrapiQuery(STRAPI_QUERIES.GLOBAL({ locale }));

  const response = await getStrapiData('global', globalQP);

  return response;
};
