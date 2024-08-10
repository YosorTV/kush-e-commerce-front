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

export const DEFAULT_LOCALE = 'uk';
export const LOCALES = ['uk', 'en'] as const;
export const LOCALES_PREFIX = 'always';

export const CATEGORY_FIELDS = ['title', 'slug', 'hintText'];
export const IMAGE_FIELDS = ['url', 'alternativeText', 'formats'];
export const PROFILE_FIELDS = ['general', 'additional', 'actions', 'avatar'];

export const AUTH_FORGOT_FIELDS = ['formFields', 'submitBtn', 'title', 'loginUrl', 'cover'];

export const AUTH_SUCCESS_FIELDS = {
  title: true,
  description: true,
  redirect: true,
  cover: { fields: IMAGE_FIELDS },
};

export const AUTH_RESET_FIELDS = {
  title: true,
  formFields: true,
  submitBtn: true,
  cover: { fields: IMAGE_FIELDS },
};

export const AUTH_LOGIN_FIELDS = {
  formFields: true,
  additionalLinks: true,
  submitBtn: true,
  rememberMe: true,
  createAccountLink: true,
  providers: true,
  cover: {
    fields: IMAGE_FIELDS,
  },
};

export const META_FIELDS = ['metaTitle', 'metaDescription', 'metaRobots', 'keywords'];

export const ROOT = '/';
export const PRIVATE_ROUTES = ['/profile', '/orders'];

export const PRICE_LOCALE = {
  USD: {
    style: 'currency',
    currency: 'USD',
  },
};

export const SCREEEN = {
  xs: '(min-width: 475px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  xxl: '(min-width: 1920px)',
};

export const SORT_OPTIONS = [
  {
    id: 1,
    label: 'recommended',
    name: 'recommended',
  },
  {
    id: 2,
    label: 'priceLowToHigh',
    name: 'low',
  },
  {
    id: 3,
    label: 'priceHighToLow',
    name: 'high',
  },
];

export const STRAPI_PAGES = {
  global: 'global',
  home: 'home',
  catalog: 'products-page',
  contacts: 'contact-us-page',
  about: 'about-us-page',
  profile: 'profile-page',
  signup: 'registration-page',
  signin: 'login-page',
  reset: 'reset-page',
  success: 'success-page',
  forgot: 'forgot-page',
  currency: 'currency-change',
  delivery: 'delivery',
};

export const passwordValidationParams = {
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  special: false,
};

export const passwordValidationRules = (value: string) => ({
  length: value.length >= 8,
  uppercase: /[A-Z]/.test(value),
  lowercase: /[a-z]/.test(value),
  number: /\d/.test(value),
  special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
});
