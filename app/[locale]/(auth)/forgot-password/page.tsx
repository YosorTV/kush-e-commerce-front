import { Metadata } from 'next';

import { getMetadata, getForgotPasswordData } from '@/services';

import { STRAPI_PAGES } from '@/helpers/constants';

import { PageLayout } from '@/components/layouts';
import { ForgotForm } from '@/components/forms';

import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.forgot, locale });

  return response;
}

export default async function ForgotPasswordPage({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getForgotPasswordData({ locale });

  return (
    <PageLayout className='auth-page_wrapper !h-lg' cover={data.cover}>
      <ForgotForm data={data} locale={locale} />
    </PageLayout>
  );
}
