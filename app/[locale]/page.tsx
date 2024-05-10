import { Metadata } from 'next';

import { StrapiBlockRender } from '@/components/simple';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { getStrapiData } from '@/services/strapi';
import { generateStrapiQuery } from '@/lib/qs';
import { PageProps } from '@/types/app/page.types';
import { PageLayout } from '@/components/layouts';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta({ ...params }));
  const data = await getStrapiData('home-page', metaQP);

  const { seo } = data;

  return {
    title: {
      default: `KUSH | ${seo?.metaTitle}`,
      template: '%s | KUSH',
    },
    description: seo?.metaDescription,
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = params;

  const homeQP = generateStrapiQuery(STRAPI_API_ROUTES.home({ locale }));
  const data = await getStrapiData('home', homeQP);

  return (
    <PageLayout>
      <StrapiBlockRender data={data?.blocks} />
    </PageLayout>
  );
}
