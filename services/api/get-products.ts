import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { generateStrapiQuery } from '@/lib';
import { revalidateTag } from 'next/cache';

export async function getProductsData({
  locale,
  page = 1,
  pageSize = 4,
  name,
  ...rest
}: any) {
  const productsApi = STRAPI_QUERIES.PRODUCTS({
    locale,
    name,
    page,
    pageSize,
    ...rest,
  });

  const response = await getStrapiData(
    'products',
    generateStrapiQuery(productsApi),
    { next: { tags: ['products'] } }
  );

  revalidateTag('products');

  return { ...response };
}
