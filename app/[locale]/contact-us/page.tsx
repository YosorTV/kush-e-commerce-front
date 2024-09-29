import { PageLayout } from '@/components/layouts';
import { getMetadata } from '@/services';
import { STRAPI_PAGES } from '@/helpers/constants';
import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';
import { ContactUsSection } from '@/components/complex/ContactUsSection';
import { getContactUsData } from '@/services/api/get-contact-us';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.contacts, locale });

  return response;
}

export default async function ContactUs({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getContactUsData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='mt-16'>
      <ContactUsSection data={data} />
    </PageLayout>
  );
}
