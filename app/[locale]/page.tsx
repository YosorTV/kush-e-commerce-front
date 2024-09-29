import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getHomeData, getMetadata } from '@/services';

import { StrapiBlockRender } from '@/components/simple';
import { PageLayout } from '@/components/layouts';
import { STRAPI_PAGES } from '@/helpers/constants';

import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.home, locale });

  return response;
}

export default async function Home({ params, searchParams }: PageProps) {
  const { locale } = params;

  const { data } = await getHomeData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='mt-16'>
      <StrapiBlockRender data={data.blocks} {...searchParams} />
    </PageLayout>
  );
}
