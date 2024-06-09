import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';

export async function getProductsData({
  locale,
  category,
  page,
  pageSize,
}: any) {
  const productsApi = STRAPI_API_ROUTES.getProducts({
    locale,
    category,
    page,
    pageSize,
  });

  const response = await getStrapiData(
    'products',
    generateStrapiQuery(productsApi)
  );

  return { ...response };
}
