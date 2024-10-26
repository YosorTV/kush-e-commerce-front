import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export async function getSizesData({ locale }: { locale: string }) {
  const sizeApi = STRAPI_QUERIES.SIZE({ locale });

  const response = await getStrapiData('sizes', generateStrapiQuery(sizeApi));

  return { data: response.data };
}
