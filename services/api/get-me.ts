import { notFound } from 'next/navigation';
import { getStrapiData } from '../strapi';

import { STRAPI_PAGES } from '@/helpers/constants';

interface IGetProducts {
  token: string;
}

export const getMe = async ({ token }: IGetProducts): Promise<any> => {
  const response = await getStrapiData(STRAPI_PAGES.me, null, { token, next: { tags: ['profile'] } });

  if (!response.id) notFound();

  return { data: response };
};