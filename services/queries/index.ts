import { aboutUsQuery } from './aboutUsQuery';
import { authQuery } from './authQuery';
import { catalogQuery } from './catalogQuery';
import { collectionMetaQuery, collectionQuery } from './collectionQuery';
import { contactUsBlockQuery, contactUsQuery } from './contactUsQuery';
import { deliveryQuery } from './deliveryQuery';
import { globalQuery } from './globalQuery';
import { homeQuery } from './homeQuery';
import { metaQuery } from './metaQuery';
import { policiesQuery } from './policiesQuery';
import { productMetaQuery, productQuery } from './productQuery';
import { productsQuery } from './productsQuery';
import { profileLayoutQuery, profileQuery } from './profileQuery';
import { sizeQuery } from './sizeQuery';
import { wishlistNotify } from './wishlistNotify';
import { wishlistProducts } from './wishlistProducts';

export const STRAPI_QUERIES = {
  GLOBAL: globalQuery,
  POLICIES: policiesQuery,
  HOME: homeQuery,
  CATALOG: catalogQuery,
  PRODUCTS: productsQuery,
  PRODUCT: productQuery,
  COLLECTION: collectionQuery,
  META_COLLECTION: collectionMetaQuery,
  META_PRODUCT: productMetaQuery,
  AUTH: authQuery,
  ABOUT_US: aboutUsQuery,
  CONTACT_US: contactUsQuery,
  CONTACT_US_BLOCK: contactUsBlockQuery,
  PROFILE: profileQuery,
  PROFILE_LAYOUT: profileLayoutQuery,
  META: metaQuery,
  SIZE: sizeQuery,
  DELIVERY: deliveryQuery,
  WISHLIST_NOTIFY: wishlistNotify,
  WISHLIST_PRODUCTS: wishlistProducts
};
