import { DEFAULT_LOCALE, STRAPI_PAGES } from '@/helpers/constants';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';

export const getWishlistNotiifcation = async ({ locale = DEFAULT_LOCALE }: { locale: string }) => {
  const wishlistApi = STRAPI_QUERIES.WISHLIST_NOTIFY({ locale });

  const response = await getStrapiData(STRAPI_PAGES.wishlistNotify, generateStrapiQuery(wishlistApi));

  return { data: response };
};
