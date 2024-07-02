import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';

export async function getCatalogData({ locale }: { locale: string }) {
  const catalogApi = STRAPI_QUERIES.CATALOG({ locale });

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
