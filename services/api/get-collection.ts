import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';
import { ISlugQuery } from '@/types/services/quries';

export async function getCollectionData({ locale, slug }: ISlugQuery) {
  const collectionApi = STRAPI_QUERIES.COLLECTION({ locale, slug });

  const response = await getStrapiData('collections', generateStrapiQuery(collectionApi));

  if (response?.data && response?.data?.length > 0) {
    return { data: { ...response.data[0] } };
  }

  return { data: null };
}

export async function getCollectionMeta({ locale, slug }: any) {
  const collectionMetaApi = STRAPI_QUERIES.META_COLLECTION({ locale, slug });

  const { data } = await getStrapiData('collections', generateStrapiQuery(collectionMetaApi));

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
