import React from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageLayout } from '@/components/layouts';
import { getMetadata } from '@/services';
import { PageProps } from '@/types/app/page.types';
import { STRAPI_PAGES } from '@/helpers/constants';
import { getAboutUsData } from '@/services/api/get-about-us';
import { AboutSection } from '@/components/complex';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.about, locale });

  return response;
}

export default async function AboutUs({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getAboutUsData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='mt-16'>
      <AboutSection cover={data?.cover} title={data?.title} content={data?.story} subImage={data?.subImage} />
    </PageLayout>
  );
}
