import { PageLayout } from '@/components/layouts';
import { StrapiBlockRender, StrapiImage } from '@/components/simple';
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

  const { data } = await getCatalogData({ locale });

  return (
    <PageLayout className='min-h-screen'>
      <div className='h-96 overflow-hidden lg:h-full'>
        <StrapiImage
          width={1500}
          height={1500}
          src={data.cover?.url}
          alt={data.cover?.alternativeText}
          className='hero-image'
          priority
        />
      </div>
      <StrapiBlockRender data={data.blocks} />
    </PageLayout>
  );
}
