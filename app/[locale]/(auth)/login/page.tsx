import { getMetadata, getSignInData } from '@/services';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SignInForm } from '@/components/forms';
import { PageLayout } from '@/components/layouts';

import { STRAPI_ENTRIES } from '@/helpers/constants';

import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_ENTRIES.signin, locale });

  return response;
}

export default async function LoginPage({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getSignInData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='auth-page_wrapper' cover={data.cover}>
      <SignInForm data={data} locale={locale} />
    </PageLayout>
  );
}
