import { aboutUsQuery } from './aboutUsQuery';
import { authQuery } from './authQuery';
import { catalogQuery } from './catalogQuery';
import { collectionMetaQuery, collectionQuery } from './collectionQuery';
import { deliveryQuery } from './deliveryQuery';
import { globalQuery } from './globalQuery';
import { homeQuery } from './homeQuery';
import { metaQuery } from './metaQuery';
import { productMetaQuery, productQuery } from './productQuery';
import { productsQuery } from './productsQuery';
import { profileQuery } from './profileQuery';
import { sizeQuery } from './sizeQuery';

export const STRAPI_QUERIES = {
  GLOBAL: globalQuery,
  HOME: homeQuery,
  CATALOG: catalogQuery,
  PRODUCTS: productsQuery,
  PRODUCT: productQuery,
  COLLECTION: collectionQuery,
  META_COLLECTION: collectionMetaQuery,
  META_PRODUCT: productMetaQuery,
  AUTH: authQuery,
  ABOUT_US: aboutUsQuery,
  PROFILE: profileQuery,
  META: metaQuery,
  SIZE: sizeQuery,
  DELIVERY: deliveryQuery,
};
