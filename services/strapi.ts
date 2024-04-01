import { flattenAttributes } from '@/lib/utils';
import { getData } from '@/lib/fetch';

export const getStrapiData = async (path: string, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);
  url.search = options;

  const response = await getData(url.href, { cache: 'no-store' });

  return flattenAttributes(response);
};
