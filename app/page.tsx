import { Metadata } from 'next';

import { StrapiBlockRender } from '@/components/simple';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { getStrapiData } from '@/services/strapi';
import { generateStrapiQuery } from '@/lib/qs';
import { PageProps } from '@/types/app/page.types';

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { locale } = searchParams;

  const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta({ locale }));
  const data = await getStrapiData('home-page', metaQP);

  const { seo } = data;

  if (seo) {
    return {
      title: {
        default: `KUSH | ${seo?.metaTitle?.toUpperCase()}`,
        template: '%s | KUSH',
      },
      description: seo?.metaDescription,
    };
  }

  return {
    title: {
      default: `KUSH | HOME`,
      template: '%s | KUSH',
    },
  };
}

export default async function Home({ searchParams }: PageProps) {
  const { locale = 'uk' } = searchParams;

  const homeQP = generateStrapiQuery(STRAPI_API_ROUTES.home({ locale }));
  const data = await getStrapiData('home-page', homeQP);

  return <StrapiBlockRender data={data?.blocks} />;
}
