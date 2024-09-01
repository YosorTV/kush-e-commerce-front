import { STRAPI_PAGES } from '@/helpers/constants';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';
import { notFound } from 'next/navigation';

export const getProfileLayoutData = async ({ locale, token }: { locale: string; token: string }): Promise<any> => {
  const profileQP = generateStrapiQuery(STRAPI_QUERIES.PROFILE_LAYOUT({ locale }));

  const response = await getStrapiData(STRAPI_PAGES.profile, profileQP, { token });

  if (!response.id) notFound();

  return { data: response };
};
