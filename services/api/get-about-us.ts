import { DEFAULT_LOCALE, STRAPI_PAGES } from '@/helpers/constants';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';

export const getAboutUsData = async ({ locale = DEFAULT_LOCALE }: { locale: string }) => {
  const aboutApi = STRAPI_QUERIES.ABOUT_US({ locale });

  const response = await getStrapiData(STRAPI_PAGES.about, generateStrapiQuery(aboutApi));

  return { data: response };
};
