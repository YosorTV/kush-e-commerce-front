import { DEFAULT_LOCALE, STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export const getPolicyData = async ({ locale = DEFAULT_LOCALE }: { locale: string }) => {
  const policyApi = STRAPI_QUERIES.POLICIES({ locale });

  const response = await getStrapiData(STRAPI_ENTRIES.policy, generateStrapiQuery(policyApi));

  return { data: response };
};
