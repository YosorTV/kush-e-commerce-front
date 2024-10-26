import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';

import { STRAPI_ENTRIES } from '@/helpers/constants';
import { STRAPI_QUERIES } from '../queries';

export async function getSignUpData({ locale }: { locale: string }) {
  const signUpQP = STRAPI_QUERIES.AUTH({ locale }).registration;

  const response = await getStrapiData(STRAPI_ENTRIES.signup, generateStrapiQuery(signUpQP));

  return { data: response };
}
