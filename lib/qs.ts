import qs from 'qs';

export const generateStrapiQuery = (props: any) => qs.stringify(props, { encodeValuesOnly: true });

interface Params {
  [key: string]: string | number | undefined;
}

export const createQueryString = (baseUrl: string, params?: Params): string => {
  const url = new URL(baseUrl, process.env.NEXT_PUBLIC_URL);

  const pathParts = url.pathname.split('/');
  const currentLocale = pathParts[1] === 'en' ? 'en' : 'uk';
  const newLocale = currentLocale === 'en' ? 'uk' : 'en';

  pathParts[1] = newLocale;

  const lastPart = pathParts[pathParts.length - 1];
  if (lastPart.endsWith(`-${currentLocale}`)) {
    pathParts[pathParts.length - 1] = lastPart.replace(`-${currentLocale}`, `-${newLocale}`);
  }

  url.pathname = pathParts.join('/');

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== undefined) {
        url.searchParams.set(key, String(params[key]));
      }
    });
  }

  return url.toString();
};

export const updateUrlParams = (pathname: string, searchParams: URLSearchParams, key: string, value?: string) => {
  const searchQuery = new URLSearchParams(searchParams);

  if (value) {
    searchQuery.set(key, value);
  } else {
    searchQuery.delete(key);
  }

  return `${pathname}?${searchQuery.toString()}`;
};
