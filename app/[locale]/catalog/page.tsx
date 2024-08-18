import { Title } from '@/components/elements';
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

export default async function Catalog({ params, searchParams }: PageProps) {
  const { locale } = params;

  const { data } = await getCatalogData({ locale });

  return (
    <PageLayout className='mt-16'>
      <div className='relative flex h-80 w-full overflow-hidden md:h-2md'>
        <StrapiImage
          fill
          priority
          className='hero-image'
          formats={data.cover.formats}
          src={data.cover.url}
          alt={data.cover.alternativeText}
          overlay
        />
        <Title
          level='1'
          variant='subheading'
          className='absolute flex h-full w-full items-center justify-center text-center !text-base-300'
        >
          {data.title}
        </Title>
      </div>
      <StrapiBlockRender data={data.blocks} {...searchParams} />
    </PageLayout>
  );
}
