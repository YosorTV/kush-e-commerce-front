import { DEFAULT_LOCALE, STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export const getTermData = async ({ locale = DEFAULT_LOCALE }: { locale: string }) => {
  const termApi = STRAPI_QUERIES.POLICIES({ locale });

  const response = await getStrapiData(STRAPI_ENTRIES.term, generateStrapiQuery(termApi));

  return { data: response };
};
