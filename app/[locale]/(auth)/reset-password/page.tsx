import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMetadata, getResetPasswordData } from '@/services';

import { STRAPI_ENTRIES } from '@/helpers/constants';

import { ResetForm } from '@/components/forms';
import { PageLayout } from '@/components/layouts';

import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_ENTRIES.reset, locale });

  return response;
}

export default async function ResetPasswordPage({ searchParams, params }: PageProps) {
  const { locale } = params;
  const { code } = searchParams;

  const { data } = await getResetPasswordData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='auth-page_wrapper' cover={data.cover}>
      <ResetForm data={data} code={code} locale={locale} />
    </PageLayout>
  );
}
