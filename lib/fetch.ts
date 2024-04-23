import { getParams, postParams } from '@/helpers/constants';

const fetcher = async (url: string, options?: any) => {
  const response = await fetch(url, options);

  const result = await response.json();

  if (result.error) {
    return {
      data: null,
      error: result.error.message,
      status: result.error.status,
    };
  }

  return result;
};

export const getData = async (path: string, options?: any) => {
  const response = await fetcher(path, getParams(options));

  return response;
};

export const postData = async (path: string, data: any, options?: any) => {
  const response = await fetcher(path, postParams({ body: data, ...options }));

  return response;
};
