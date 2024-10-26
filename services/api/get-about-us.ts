import { DEFAULT_LOCALE, STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export const getAboutUsData = async ({ locale = DEFAULT_LOCALE }: { locale: string }) => {
  const aboutApi = STRAPI_QUERIES.ABOUT_US({ locale });

  const response = await getStrapiData(STRAPI_ENTRIES.about, generateStrapiQuery(aboutApi));

  return { data: response };
};
