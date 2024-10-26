import { STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { PageProps } from '@/types/app/page.types';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export const getHomeData = async ({ locale }: PageProps['params']): Promise<any> => {
  const homeQP = generateStrapiQuery(STRAPI_QUERIES.HOME({ locale }));

  const response = await getStrapiData(STRAPI_ENTRIES.home, homeQP);

  return { data: response };
};
