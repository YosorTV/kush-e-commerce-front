import { SignUpForm } from '@/components/forms';
import { PageLayout } from '@/components/layouts';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getSignUpData } from '@/services';
import { getStrapiData } from '@/services/strapi';
import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params;

  const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta({ locale }));
  const { seo } = await getStrapiData('registration-page', metaQP);

  return {
    title: {
      default: `KUSH | ${seo.metaTitle}`,
      template: '%s | KUSH',
    },
    description: seo.metaDescription,
  };
}

export default async function SignUpPage({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getSignUpData({ locale });

  return (
    <PageLayout
      className='relative mb-12 mt-8 h-screen md:h-xl'
      cover={data.cover}
    >
      <SignUpForm
        title='Create account'
        locale={locale}
        formFields={data.formFields}
        cta={data.submitBtn}
        className='absolute left-1/2 w-[95%] -translate-x-1/2 transform rounded-md p-4 pt-2 shadow-2xl md:w-[680px] md:p-8 md:pt-4'
      />
    </PageLayout>
  );
}
