import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { generateStrapiQuery } from '@/lib';
import { ISlugQuery } from '@/types/services/quries';
import { auth } from '@/auth';
import { getWishlistProducts } from './get-wished-products';
import { Product } from '@/types/components';

export async function getProductData({ locale, slug }: ISlugQuery) {
  const productApi = STRAPI_QUERIES.PRODUCT({ locale, slug });

  const session = await auth();

  const response = await getStrapiData('products', generateStrapiQuery(productApi));

  if (response?.data && response?.data?.length > 0) {
    const product = response.data[0];

    if (session?.accessToken) {
      const { data: wishlist } = await getWishlistProducts({
        locale,
        userId: Number(session.user.id),
        token: session.accessToken
      });

      const wishlistProductIds = wishlist
        .flatMap((item: any) => item.products.data)
        .map((product: Product) => product.id);

      return { data: { ...product, inWishlist: wishlistProductIds.includes(product.id) } };
    }

    return { data: { ...product } };
  }

  return { data: null };
}

export async function getProductMeta({ locale, slug }: any) {
  const productMetaApi = STRAPI_QUERIES.META_PRODUCT({ locale, slug });

  const { data } = await getStrapiData('products', generateStrapiQuery(productMetaApi));

  return {
    title: {
      default: `KUSH | ${data[0]?.seo?.metaTitle.toUpperCase()}`,
      template: '%s | KUSH'
    },
    description: data[0]?.seo?.metaDescription ?? '',
    robots: data[0]?.seo?.metaRobots ?? '',
    keywords: data[0]?.seo?.keywords ?? ''
  };
}
