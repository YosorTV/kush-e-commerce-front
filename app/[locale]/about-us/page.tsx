import React from 'react';
import { PageLayout } from '@/components/layouts';
import { Title } from '@/components/elements';
import { getMetadata } from '@/services';
import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';
import { STRAPI_PAGES } from '@/helpers/constants';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.about, locale });

  return response;
}

export default async function AboutUs() {
  return (
    <PageLayout className='h-screen py-16'>
      <Title level='1'>About Us</Title>
    </PageLayout>
  );
}
