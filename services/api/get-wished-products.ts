import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { generateStrapiQuery } from '@/lib';
import { DEFAULT_LOCALE, STRAPI_PAGES } from '@/helpers/constants';

export const getWishlistProducts = async ({ locale = DEFAULT_LOCALE, token }: { locale: string; token: string }) => {
  const wishlistApi = STRAPI_QUERIES.WISHLIST_PRODUCTS({ locale });

  const response = await getStrapiData(STRAPI_PAGES.wishlist, generateStrapiQuery(wishlistApi), token);

  return { data: response };
};
