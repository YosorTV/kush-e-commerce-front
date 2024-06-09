import qs from 'qs';

export const generateStrapiQuery = (props: any) =>
  qs.stringify(props, { encodeValuesOnly: true });

interface Params {
  [key: string]: string | number | undefined;
}

export const createQueryString = (baseUrl: string, params?: Params): string => {
  const url = new URL(baseUrl, process.env.NEXT_PUBLIC_URL);
  const locale = url.pathname.startsWith('/en') ? '/uk' : '/en';

  if (url.pathname.startsWith('/en/') || url.pathname.startsWith('/uk/')) {
    url.pathname = locale + url.pathname.substring(3);
  } else {
    url.pathname = locale;
  }

  if (params) {
    for (const key in params) {
      if (params[key]) {
        url.searchParams.set(key, String(params[key]));
      }
    }
  }

  return url.toString();
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

export const updateUrlParams = (
  pathname: string,
  searchParams: URLSearchParams,
  key: string,
  value?: string
) => {
  const searchQuery = new URLSearchParams(searchParams);

  if (value) {
    searchQuery.set(key, value);
  } else {
    searchQuery.delete(key);
  }

  return `${pathname}?${searchQuery.toString()}`;
};
