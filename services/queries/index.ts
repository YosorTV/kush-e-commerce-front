import { authQuery } from './authQuery';
import { catalogQuery } from './catalogQuery';
import { globalQuery } from './globalQuery';
import { homeQuery } from './homeQuery';
import { metaQuery } from './metaQuery';
import { productQuery } from './productQuery';
import { productsQuery } from './productsQuery';
import { profileQuery } from './profileQuery';

export const STRAPI_QUERIES = {
  GLOBAL: globalQuery,
  HOME: homeQuery,
  CATALOG: catalogQuery,
  PRODUCTS: productsQuery,
  PRODUCT: productQuery,
  AUTH: authQuery,
  PROFILE: profileQuery,
  META: metaQuery,
};
