import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { generateStrapiQuery } from '@/lib';

export async function getProductsData({
  locale,
  category,
  page,
  pageSize,
  name,
  ...rest
}: any) {
  const productsApi = STRAPI_QUERIES.PRODUCTS({
    locale,
    name,
    page,
    pageSize,
    category,
    ...rest,
  });

  const response = await getStrapiData(
    'products',
    generateStrapiQuery(productsApi)
  );

  return { ...response };
}
