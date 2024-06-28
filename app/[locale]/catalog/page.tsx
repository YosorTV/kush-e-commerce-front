import { ProductsSection } from '@/components/complex';
import { PageLayout } from '@/components/layouts';
import { STRAPI_PAGES } from '@/helpers/constants';

import { getMetadata } from '@/services';

import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.catalog, locale });

  return response;
}

export default async function Catalog({ params }: PageProps) {
  const { locale } = params;

  return (
    <PageLayout className='min-h-screen py-16'>
      <ProductsSection locale={locale} />
    </PageLayout>
  );
}
