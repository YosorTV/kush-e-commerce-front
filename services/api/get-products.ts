'use server';

import { auth } from '@/auth';
import { generateStrapiQuery } from '@/lib';
import { Product } from '@/types/components';
import { revalidateTag } from 'next/cache';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';
import { getWishlistProducts } from './get-wished-products';

export async function getProductsData({ locale, page = 1, pageSize = 5, name, ...rest }: any) {
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
      page: '1',
      pageSize: '10',
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
