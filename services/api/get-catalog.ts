import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { STRAPI_PAGES } from '@/helpers/constants';

export async function getCatalogData({ locale }: { locale: string }) {
  const catalogQP = STRAPI_QUERIES.CATALOG({ locale });

  const response = await getStrapiData(
    STRAPI_PAGES.catalog,
    generateStrapiQuery(catalogQP)
  );

  return { data: response };
}
