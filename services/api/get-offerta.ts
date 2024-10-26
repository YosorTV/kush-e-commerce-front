import { generateStrapiQuery } from '@/lib';

import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

import { DEFAULT_LOCALE, STRAPI_ENTRIES } from '@/helpers/constants';

export const getOffertaData = async ({ locale = DEFAULT_LOCALE }: { locale: string }) => {
  const offertaApi = STRAPI_QUERIES.POLICIES({ locale });

  const response = await getStrapiData(STRAPI_ENTRIES.offerta, generateStrapiQuery(offertaApi));

  return { data: response };
};
