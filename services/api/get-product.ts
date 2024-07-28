import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { generateStrapiQuery } from '@/lib';

export async function getProductData({ locale, slug }: any) {
  const productApi = STRAPI_QUERIES.PRODUCT({ locale, slug });

  const response = await getStrapiData(
    'products',
    generateStrapiQuery(productApi)
  );

  if (response?.data && response?.data?.length > 0) {
    return { data: { ...response.data[0] } };
  }

  return { data: null };
}
