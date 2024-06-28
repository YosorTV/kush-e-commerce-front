import { Metadata } from 'next';

import { getMetadata, getSignUpData } from '@/services';

import { STRAPI_PAGES } from '@/helpers/constants';

import { SignUpForm } from '@/components/forms';
import { PageLayout } from '@/components/layouts';

import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.signup, locale });

  return response;
}

export default async function SignUpPage({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getSignUpData({ locale });

  return (
    <PageLayout className='auth-page_wrapper' cover={data.cover}>
      <SignUpForm
        title={data.title}
        locale={locale}
        formFields={data.formFields}
        cta={data.submitBtn}
        className='auth-page_form'
      />
    </PageLayout>
  );
}
