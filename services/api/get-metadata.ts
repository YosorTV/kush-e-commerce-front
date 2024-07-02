import { generateStrapiQuery } from '@/lib';

import { Metadata } from 'next';
import { getStrapiData } from '../strapi';
import { STRAPI_QUERIES } from '../queries';

interface IGenerateMeta {
  path: string;
  locale: string;
}

export async function getMetadata({
  path,
  locale,
}: IGenerateMeta): Promise<Metadata> {
  const metaQP = generateStrapiQuery(STRAPI_QUERIES.META({ locale }));
  const { seo } = await getStrapiData(path, metaQP);

  return {
    title: {
      default: `KUSH | ${seo?.metaTitle}`,
      template: '%s | KUSH',
    },
    description: seo?.metaDescription ?? '',
    robots: seo?.metaRobots ?? '',
    keywords: seo?.keywords ?? '',
  };
}
