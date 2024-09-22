import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';

import { STRAPI_QUERIES } from '../queries';
import { STRAPI_PAGES } from '@/helpers/constants';

export async function getSignUpData({ locale }: { locale: string }) {
  const signUpQP = STRAPI_QUERIES.AUTH({ locale }).registration;

  const response = await getStrapiData(STRAPI_PAGES.signup, generateStrapiQuery(signUpQP));

  return { data: response };
}
