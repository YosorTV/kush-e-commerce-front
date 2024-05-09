import { ResetForm } from '@/components/forms';
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
  const { seo } = await getStrapiData('reset-page', metaQP);

  return {
    title: {
      default: `KUSH | ${seo?.metaTitle?.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: seo?.metaDescription,
  };
}

export default async function ResetPasswordPage({
  searchParams,
  params,
}: PageProps) {
  const { locale } = params;
  const { code } = searchParams;

  const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.auth({ locale }).reset);
  const data = await getStrapiData('reset-page', pageQP);

  return (
    <div className='container flex h-full flex-col items-center justify-center gap-y-5'>
      <ResetForm
        formFields={data.formFields}
        submitBtn={data.submitBtn}
        code={code}
      />
    </div>
  );
}
