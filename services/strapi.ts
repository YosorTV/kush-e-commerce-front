import { flattenAttributes } from '@/lib/utils';
import { getData, postData } from '@/lib/fetch';

export const getStrapiData = async (path: string, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);
  url.search = options || null;

  const response = await getData(url.href, { cache: 'no-store' });

  return flattenAttributes(response);
};

export const postStrapiData = async (
  path: string,
  data: any,
  options?: any
) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);
  url.search = options;

  const response = await postData(url.href, data, { cache: 'no-store' });

  return response;
};

export const getStrapiAuthData = async ({ provider, token }: any) => {
  const url = new URL(
    `api/auth/${provider}/callback?access_token=${token}`,
    process.env.NEXT_PUBLIC_STRAPI_URL
  );

  const response = await getData(url.href, { cache: 'no-store' });

  return response;
};
