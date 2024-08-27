import { postStrapiData } from '../strapi';

interface IPostStrapiWishlist {
  access_token: string;
  productId: number;
  userId: number;
  locale: string;
}

export const postStrapiWishlist = async ({ access_token, productId, userId, locale = 'uk' }: IPostStrapiWishlist) => {
  const response = await postStrapiData('update-wishlist', {
    productId,
    userId,
    locale,
    token: access_token
  });

  return response;
};
