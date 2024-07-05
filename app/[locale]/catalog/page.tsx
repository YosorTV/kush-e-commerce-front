import { CatalogSection } from '@/components/complex';
import { PageLayout } from '@/components/layouts';
import { StrapiImage } from '@/components/simple';
import { STRAPI_PAGES } from '@/helpers/constants';

import { getCatalogData, getMetadata } from '@/services';

import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.catalog, locale });

  return response;
}

export default async function Catalog({ params }: PageProps) {
  const { locale } = params;

  const { img } = await getCatalogData({ locale });

  return (
    <PageLayout className='min-h-screen py-10'>
      <div className='h-96 overflow-hidden lg:h-full'>
        <StrapiImage
          width={1000}
          height={1000}
          src={img?.url}
          alt={img?.alternativeText}
          className='hero-image'
          priority
        />
      </div>
      <CatalogSection />
    </PageLayout>
  );
}
