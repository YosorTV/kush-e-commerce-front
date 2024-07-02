import { PageLayout } from '@/components/layouts';
import { Title } from '@/components/elements';
import { getMetadata } from '@/services';
import { STRAPI_PAGES } from '@/helpers/constants';
import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.contacts, locale });

  return response;
}

export default async function ContactUs() {
  return (
    <PageLayout className='h-screen py-20'>
      <Title level='1'>Contact Us</Title>
    </PageLayout>
  );
}
