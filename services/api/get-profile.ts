import { notFound } from 'next/navigation';
import { generateStrapiQuery } from '@/lib';

import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

import { STRAPI_PAGES } from '@/helpers/constants';

interface IGetProducts {
  locale: string;
  token: string;
}

export const getProfileData = async ({
  locale,
  token,
}: IGetProducts): Promise<any> => {
  const profileQP = generateStrapiQuery(STRAPI_QUERIES.PROFILE({ locale }));

  const response = await getStrapiData(STRAPI_PAGES.profile, profileQP, {
    token,
  });

  if (!response.id) notFound();

  return { data: response };
};
