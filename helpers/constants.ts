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
  global: {
    populate: [
      'header.logoText',
      'header.ctaButton',
      'header.sessionLinks',
      'footer.logoText',
      'footer.ctaButton',
      'shoppingCart',
    ],
  },
  home: {
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
  },
  getProducts: ({ page, per_page, name, id }: any) => ({
    id,
    name,
    page: page || 1,
    pageSize: per_page || 5,
  }),
  getProductDetails: {
    populate: {
      cover: {
        fields: ['url', 'alternativeText'],
      },
      images: {
        fields: ['url', 'alternativeText'],
      },
    },
  },
  auth: {
    registration: { populate: ['formFields', 'redirectUrl', 'submitBtn'] },
    success: { populate: ['title', 'description', 'redirectUrl'] },
    forgot: { populate: ['formFields', 'submitBtn', 'loginUrl'] },
    reset: { populate: ['formFields', 'submitBtn'] },
    login: {
      populate: ['formFields', 'additionalLinks', 'submitBtn', 'providers'],
    },
  },
  me: {
    populate: {
      formFields: {
        populate: ['general', 'additional', 'actions', 'avatar'],
      },
    },
  },
  meta: {
    fields: ['title', 'description'],
  },
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
