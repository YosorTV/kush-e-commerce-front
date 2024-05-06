import { NextLink } from '@/components/elements';
import { ForgotForm } from '@/components/forms';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { locale } = searchParams;

  const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta({ locale }));
  const { seo } = await getStrapiData('forgot-page', metaQP);

  return {
    title: {
      default: `KUSH | ${seo?.metaTitle?.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: seo?.metaDescription,
  };
}

export default async function ForgotPasswordPage({ searchParams }: PageProps) {
  const { locale } = searchParams;

  const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.auth({ locale }).forgot);
  const data = await getStrapiData('forgot-page', pageQP);

  return (
    <div className='container flex h-full flex-col items-center justify-center gap-y-5'>
      <ForgotForm formFields={data.formFields} submitBtn={data.submitBtn} />
      <NextLink
        className='link link-primary'
        href={data.loginUrl.url}
        replace={data.loginUrl.isExternal}
      >
        {data.loginUrl.text}
      </NextLink>
    </div>
  );
}
