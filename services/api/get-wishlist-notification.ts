import { DEFAULT_LOCALE, STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export const getWishlistNotiifcation = async ({ locale = DEFAULT_LOCALE }: { locale: string }) => {
  const wishlistApi = STRAPI_QUERIES.WISHLIST_NOTIFY({ locale });

  const response = await getStrapiData(STRAPI_ENTRIES.wishlistNotify, generateStrapiQuery(wishlistApi));

  return { data: response };
};
