export const getParams = (options?: any) => {
  return {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  };
};

export const postParams = ({ data, options }: any) => {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
    body: JSON.stringify(data),
  };
};

export const putParams = (options: any, body: any) => {
  return {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
    body: JSON.stringify(body),
  };
};

export const patchParams = (options: any, body: any) => {
  return {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
    body: JSON.stringify(body),
  };
};

export const deleteParams = (options: any, body: any) => {
  return {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options,
    },
    body: JSON.stringify(body),
  };
};

export const PRICE_LOCALE = {
  USD: {
    style: 'currency',
    currency: 'USD',
  },
};

export const STRAPI_API_ROUTES = {
  global: {
    populate: [
      'header.logoText',
      'header.ctaButton',
      'header.sessionLinks',
      'footer.logoText',
      'footer.ctaButton',
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
  meta: {
    fields: ['title', 'description'],
  },
};
