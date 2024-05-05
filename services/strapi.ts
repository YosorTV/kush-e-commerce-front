import { flattenAttributes } from '@/lib/utils';
import { getData, postData } from '@/lib/fetch';
import { revalidatePath } from 'next/cache';

export const getStrapiData = async (
  path: string,
  queryParams?: any,
  options?: any
) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);
  url.search = queryParams || null;

  const response = await getData(url.href, { ...options, cache: 'no-store' });

  revalidatePath('/', 'layout');

  return flattenAttributes(response);
};

export const postStrapiData = async (
  path: string,
  data: any,
  options?: any
) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);
  url.search = options;

  const response = await postData(url.href, data);

  return response;
};

export const getStrapiAuthData = async ({ provider, token }: any) => {
  const url = new URL(
    `api/auth/${provider}/callback?access_token=${token}`,
    process.env.NEXT_PUBLIC_STRAPI_URL
  );

  const response = await getData(url.href, { cache: 'no-cache' });

  return response;
};
