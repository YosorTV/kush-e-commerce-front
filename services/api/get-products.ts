'use server';

import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { generateStrapiQuery } from '@/lib';
import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import { getWishlistProducts } from './get-wished-products';
import { Product } from '@/types/components';

export async function getProductsData({ locale, page = 1, pageSize = 4, name, ...rest }: any) {
  const session = await auth();

  const productsApi = STRAPI_QUERIES.PRODUCTS({
    locale,
    name,
    page,
    pageSize,
    ...rest
  });

  const response = await getStrapiData('products', generateStrapiQuery(productsApi), { next: { tags: ['products'] } });

  if (session?.accessToken) {
    const { data: wishlist } = await getWishlistProducts({
      locale,
      userId: Number(session.user.id),
      token: session.accessToken
    });

    const wishlistProductIds = wishlist
      .flatMap((item: any) => item.products.data)
      .map((product: Product) => product.id);

    const updatedProducts = response.data.map((product: Product) => {
      const inWishlist = wishlistProductIds.includes(product.id);

      return {
        ...product,
        inWishlist
      };
    });

    const filteredProducts = updatedProducts.filter((product: any) => product.locale === locale);

    revalidateTag('products');

    return {
      ...response,
      data: filteredProducts
    };
  }

  return { ...response };
}
