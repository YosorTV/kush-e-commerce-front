import { getStrapiData } from '../strapi';

import { STRAPI_ENTRIES } from '@/helpers/constants';

interface IGetProducts {
  token: string;
}

export const getMe = async ({ token }: IGetProducts): Promise<any> => {
  const response = await getStrapiData(STRAPI_ENTRIES.me, null, { token, next: { tags: ['profile'] } });

  return { data: response };
};
