import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { STRAPI_PAGES } from '@/helpers/constants';

interface IGetCatalogData {
  locale: string;
}

export async function getCatalogData({ locale }: IGetCatalogData) {
  const catalogQP = STRAPI_QUERIES.CATALOG({ locale });

  const response = await getStrapiData(
    STRAPI_PAGES.catalog,
    generateStrapiQuery(catalogQP)
  );

  return { data: response };
}
