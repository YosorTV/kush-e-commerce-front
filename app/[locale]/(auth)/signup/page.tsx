import { SignUpForm } from '@/components/forms';
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
    <div className='container flex h-full flex-col items-center justify-center gap-y-5'>
      <div className='w-1/3'>
        <SignUpForm formFields={data.formFields} cta={data.submitBtn} />
      </div>
    </div>
  );
}
