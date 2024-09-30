import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';

export async function getMaterialsData({ locale }: { locale: string }) {
  const sizeApi = STRAPI_QUERIES.SIZE({ locale });

  const response = await getStrapiData('materials', generateStrapiQuery(sizeApi));

  return { data: response.data };
}
