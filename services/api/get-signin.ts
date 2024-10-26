import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';

import { STRAPI_ENTRIES } from '@/helpers/constants';
import { STRAPI_QUERIES } from '../queries';

export async function getSignInData({ locale }: { locale: string }) {
  const signInQP = STRAPI_QUERIES.AUTH({ locale }).login;

  const response = await getStrapiData(STRAPI_ENTRIES.signin, generateStrapiQuery(signInQP));

  return { data: response };
}
