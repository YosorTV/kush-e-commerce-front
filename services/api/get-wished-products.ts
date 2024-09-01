import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { generateStrapiQuery } from '@/lib';
import { DEFAULT_LOCALE, STRAPI_PAGES } from '@/helpers/constants';

interface IGetWishlistProducts {
  locale: string;
  userId: number;
  token: string;
}

export const getWishlistProducts = async ({ locale = DEFAULT_LOCALE, userId, token }: IGetWishlistProducts) => {
  const wishlistApi = STRAPI_QUERIES.WISHLIST_PRODUCTS({ locale, userId });

  const { data, meta } = await getStrapiData(STRAPI_PAGES.wishlist, generateStrapiQuery(wishlistApi), token);

  return { data, meta };
};
