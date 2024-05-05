import qs from 'qs';

export const generateStrapiQuery = (props: any) => qs.stringify(props);

interface Params {
  [key: string]: string | number | undefined;
}

export const createQueryString = (baseUrl: string, params: Params): string => {
  const existingQuery = baseUrl.includes('?');
  const query = new URLSearchParams(existingQuery ? '' : baseUrl.split('?')[1]);

  for (const key in params) {
    if (params[key]) {
      query.set(key, String(params[key]));
    }
  }

  const queryString = query.toString();

  return existingQuery
    ? `${baseUrl}&${queryString}`
    : `${baseUrl}?${queryString}`;
};

export const getUrlParams = ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
  const params: Record<string, string | null> = {};

  searchParams.forEach((value, key) => {
    params[key] = value || null;
  });

  return params;
};
