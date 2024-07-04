import { flattenAttributes } from '@/lib/utils';
import { getData, postData, putData } from '@/lib/fetch';

export const getStrapiData = async (
  path: string,
  queryParams?: any,
  options?: any
) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);

  if (queryParams) {
    url.search = queryParams;
  }

  const response = await getData(url.href, { ...options });

  return flattenAttributes(response);
};

export const postStrapiData = async (
  path: string,
  data: any,
  options?: any
) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);

  if (options) {
    url.search = options;
  }

  const response = await postData(url.href, data);

  return response;
};

export const putStrapiData = async (path: string, data: any, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);
  url.search = options;

  const response = await putData(url.href, data);

  return response;
};
