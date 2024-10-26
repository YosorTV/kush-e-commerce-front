import { STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export const getProfileLayoutData = async ({ locale, token }: { locale: string; token: string }): Promise<any> => {
  const profileQP = generateStrapiQuery(STRAPI_QUERIES.PROFILE_LAYOUT({ locale }));

  const response = await getStrapiData(STRAPI_ENTRIES.profile, profileQP, { token });

  return { data: response };
};
