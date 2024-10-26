import { STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

interface IGetCatalogData {
  locale: string;
}

export async function getCatalogData({ locale }: IGetCatalogData) {
  const catalogQP = STRAPI_QUERIES.CATALOG({ locale });

  const response = await getStrapiData(STRAPI_ENTRIES.catalog, generateStrapiQuery(catalogQP));

  return { data: response };
}
