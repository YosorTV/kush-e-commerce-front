import { Metadata } from 'next';

import { getMetadata, getResetPasswordData } from '@/services';

import { STRAPI_PAGES } from '@/helpers/constants';

import { PageLayout } from '@/components/layouts';
import { ResetForm } from '@/components/forms';

import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.reset, locale });

  return response;
}

export default async function ResetPasswordPage({
  searchParams,
  params,
}: PageProps) {
  const { locale } = params;
  const { code } = searchParams;

  const { data } = await getResetPasswordData({ locale });

  return (
    <PageLayout className='auth-page_wrapper' cover={data.cover}>
      <ResetForm data={data} code={code} locale={locale} />
    </PageLayout>
  );
}
