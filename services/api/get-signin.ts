import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';

import { STRAPI_QUERIES } from '../queries';
import { STRAPI_PAGES } from '@/helpers/constants';

export async function getSignInData({ locale }: { locale: string }) {
  const signInQP = STRAPI_QUERIES.AUTH({ locale }).login;

  const response = await getStrapiData(STRAPI_PAGES.signin, generateStrapiQuery(signInQP));

  return { data: response };
}
