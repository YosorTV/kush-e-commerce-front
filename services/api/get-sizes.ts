import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';

export async function getSizesData({ locale }: { locale: string }) {
  const sizeApi = STRAPI_QUERIES.SIZE({ locale });

  const response = await getStrapiData('sizes', generateStrapiQuery(sizeApi));

  return { data: response.data };
}
