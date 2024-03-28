import { getParams, postParams } from '@/helpers/constants';

export const postData = async (path: string, data: any, options?: any) => {
  const response = await fetch(path, postParams({ data, options }));

  const result = await response.json();

  return result;
};

export const getData = async (path: string, options?: any) => {
  try {
    const response = await fetch(path, getParams(options));
    const result = await response.json();
    return result;
  } catch(err) {
    console.error(err);
  }
};