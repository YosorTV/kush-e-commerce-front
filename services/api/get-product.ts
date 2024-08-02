import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { generateStrapiQuery } from '@/lib';

export async function getProductData({ locale, slug }: any) {
  const productApi = STRAPI_QUERIES.PRODUCT({ locale, slug });

  const response = await getStrapiData(
    'products',
    generateStrapiQuery(productApi)
  );

  if (response?.data && response?.data?.length > 0) {
    return { data: { ...response.data[0] } };
  }

  return { data: null };
}

export async function getProductMeta({ locale, slug }: any) {
  const productMetaApi = STRAPI_QUERIES.META_PRODUCT({ locale, slug });

  const { data } = await getStrapiData(
    'products',
    generateStrapiQuery(productMetaApi)
  );

  return {
    title: {
      default: `KUSH | ${data[0]?.seo?.metaTitle.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: data[0]?.seo?.metaDescription ?? '',
    robots: data[0]?.seo?.metaRobots ?? '',
    keywords: data[0]?.seo?.keywords ?? '',
  };
}
