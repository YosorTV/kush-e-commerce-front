import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { generateStrapiQuery } from '@/lib';

export async function getProductsData({
  locale,
  category,
  page,
  pageSize,
  name,
}: any) {
  const productsApi = STRAPI_QUERIES.PRODUCTS({
    locale,
    category,
    page,
    pageSize,
    name,
  });

  const response = await getStrapiData(
    'products',
    generateStrapiQuery(productsApi)
  );

  return { ...response };
}
