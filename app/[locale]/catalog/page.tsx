import { ProductsSection } from '@/components/complex';
import { PageLayout } from '@/components/layouts';

import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getCatalogData, getProductsData } from '@/services';
import { getStrapiData } from '@/services/strapi';
import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta({ ...params }));
  const data = await getStrapiData('products-page', metaQP);

  const { seo } = data;

  return {
    title: {
      default: `KUSH | ${seo?.metaTitle}`,
      template: '%s | KUSH',
    },
    description: seo?.metaDescription,
    robots: seo?.metaRobots,
    keywords: seo?.keywords,
  };
}

export default async function Catalog({ params, searchParams }: PageProps) {
  const { locale } = params;
  const { category } = searchParams;

  const { title, categories, img } = await getCatalogData({ locale });
  const { data } = await getProductsData({ locale, category });

  return (
    <PageLayout className='min-h-screen py-16'>
      <ProductsSection
        cover={img}
        title={title}
        products={data}
        categories={categories}
      />
    </PageLayout>
  );
}
