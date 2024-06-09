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
      populate: {
        header: {
          populate: {
            cta: true,
            pages: true,
            sessionLinks: true,
          },
        },
        footer: {
          populate: {
            formField: true,
            termsLink: true,
            linksGroupTitle: true,
            links: true,
            socialLinks: true,
          },
        },
        shoppingCart: {
          populate: true,
        },
      },
    };
  },
  home: ({ locale = 'uk' }) => {
    return {
      locale,
      populate: {
        blocks: {
          populate: {
            products: {
              populate: {
                images: {
                  fields: ['url', 'alternativeText', 'formats'],
                },
              },
            },
            image: {
              fields: ['url', 'alternativeText'],
            },
            sub_image: {
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
  catalog: ({ locale = 'uk' }) => {
    return {
      locale,
      populate: {
        cover: {
          fields: ['url', 'alternativeText', 'formats'],
        },
        categories: {
          fields: ['title', 'slug'],
        },
      },
    };
  },
  getProducts: ({
    id,
    name,
    locale,
    category,
    page,
    pageSize,
  }: PageProps['searchParams']) => {
    const filters =
      category && category !== '*' ? { category: { $eq: category } } : {};

    return {
      id,
      name,
      locale,
      populate: {
        images: {
          populate: {
            data: {
              fields: ['url', 'alternativeText', 'formats'],
            },
          },
        },
      },
      filters,
      pagination: {
        page: page || 1,
        pageSize: pageSize || 4,
      },
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
        fields: ['metaTitle', 'metaDescription', 'metaRobots', 'keywords'],
      },
    },
  }),
};

export const LOCALES = ['uk', 'en'] as const;
export const LOCALES_PREFIX = 'always';

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

export const SCREEEN = {
  xs: '(max-width: 475px)',
  sm: '(max-width: 640px)',
  md: '(max-width: 768px)',
  lg: '(max-width: 1024px)',
  xl: '(max-width: 1280px)',
  xxl: '(max-width: 1920px)',
};
