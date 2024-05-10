import { SignUpForm } from '@/components/forms';
import { PageLayout } from '@/components/layouts';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
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

  const pageQP = generateStrapiQuery(
    STRAPI_API_ROUTES.auth({ locale }).registration
  );

  const data = await getStrapiData('registration-page', pageQP);

  return (
    <PageLayout className='container h-screen'>
      <div className='mx-auto flex h-full w-1/3 flex-col justify-center gap-y-5'>
        <SignUpForm formFields={data.formFields} cta={data.submitBtn} />
      </div>
    </PageLayout>
  );
}
