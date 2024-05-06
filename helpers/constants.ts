import { PageProps } from '@/types/app/page.types';

interface RequestOptions {
  token?: string;
  body?: any;
}

const baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getParams = (options: RequestOptions = {}): RequestInit => {
  const headers: HeadersInit = { ...baseHeaders };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  return {
    method: 'GET',
    headers,
    ...options,
  };
};

const postParams = (options: RequestOptions = {}): RequestInit => {
  const headers: HeadersInit = { ...baseHeaders };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  return {
    method: 'POST',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };
};

const putParams = (options: RequestOptions = {}): RequestInit => {
  const headers: HeadersInit = { ...baseHeaders };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  return {
    method: 'PUT',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };
};

const deleteParams = (options: RequestOptions = {}): RequestInit => {
  const headers: HeadersInit = { ...baseHeaders };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  return {
    method: 'DELETE',
    headers,
    ...options,
  };
};

export { getParams, postParams, putParams, deleteParams };

export const STRAPI_API_ROUTES = {
  global: ({ locale = 'uk' }) => {
    return {
      locale,
      populate: [
        'header.logoText',
        'header.ctaButton',
        'header.sessionLinks',
        'footer.logoText',
        'footer.ctaButton',
        'shoppingCart',
      ],
    };
  },
  home: ({ locale = 'uk' }) => {
    return {
      locale,
      populate: {
        blocks: {
          populate: {
            image: {
              fields: ['url', 'alternativeText'],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    };
  },
  products: ({ locale = 'uk' }) => {
    return {
      locale,
      populate: true,
    };
  },
  getProducts: ({
    page,
    per_page,
    name,
    locale,
    id,
  }: PageProps['searchParams']) => {
    return {
      id,
      locale,
      name,
      page: page || 1,
      pageSize: per_page || 5,
    };
  },
  getProductDetails: ({ locale = 'uk', code = null }) => ({ locale, code }),
  auth: ({ locale = 'uk' }) => {
    return {
      registration: {
        locale,
        populate: ['formFields', 'redirectUrl', 'submitBtn'],
      },
      success: { locale, populate: ['title', 'description', 'redirectUrl'] },
      forgot: {
        locale,
        populate: ['formFields', 'submitBtn', 'loginUrl'],
      },
      reset: {
        locale,
        populate: ['formFields', 'submitBtn'],
      },
      login: {
        locale,
        populate: ['formFields', 'additionalLinks', 'submitBtn', 'providers'],
      },
    };
  },
  me: ({ locale = 'uk' }) => {
    return {
      locale,
      populate: {
        formFields: {
          populate: ['general', 'additional', 'actions', 'avatar'],
        },
      },
    };
  },
  meta: ({ locale = 'uk' }) => ({
    locale,
    populate: {
      seo: {
        fields: ['metaTitle', 'metaDescription'],
      },
    },
  }),
};

export const ROOT = '/';
export const PRIVATE_ROUTES = ['/profile', '/orders'];
export const PRICE_LOCALE = {
  USD: {
    style: 'currency',
    currency: 'USD',
  },
  UAH: {
    style: 'currency',
    currency: 'UAH',
  },
};
