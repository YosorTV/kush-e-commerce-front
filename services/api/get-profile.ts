import { generateStrapiQuery } from '@/lib';

import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

import { STRAPI_ENTRIES } from '@/helpers/constants';

interface IGetProducts {
  locale: string;
  token: string;
}

export const getProfileData = async ({ locale, token }: IGetProducts): Promise<any> => {
  const profileQP = generateStrapiQuery(STRAPI_QUERIES.PROFILE({ locale }));

  const response = await getStrapiData(STRAPI_ENTRIES.profile, profileQP, { token });

  return { data: response };
};
