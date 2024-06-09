import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';

export async function getCatalogData({ locale }: { locale: string }) {
  const catalogApi = STRAPI_API_ROUTES.catalog({ locale });

  const response = await getStrapiData(
    'products-page',
    generateStrapiQuery(catalogApi)
  );

  return {
    title: response?.title,
    img: response?.cover,
    categories: response?.categories?.data,
  };
}
