import { generateStrapiQuery } from '@/lib';
import { PageProps } from '@/types/app/page.types';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';
import { STRAPI_PAGES } from '@/helpers/constants';
import { notFound } from 'next/navigation';

export const getHomeData = async ({
  locale,
}: PageProps['params']): Promise<any> => {
  const homeQP = generateStrapiQuery(STRAPI_QUERIES.HOME({ locale }));

  const response = await getStrapiData(STRAPI_PAGES.home, homeQP);

  if (!response.id) notFound();

  return { data: response };
};
