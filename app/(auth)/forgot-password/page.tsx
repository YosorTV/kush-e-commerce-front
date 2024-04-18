import { NextLink } from '@/components/elements';
import { ForgotForm } from '@/components/forms';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { Metadata } from 'next';

const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta);
const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.auth.forgot);

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStrapiData('forgot-page', metaQP);

  return {
    title: {
      default: `KUSH | ${data?.title?.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: data?.description,
  };
}

export default async function ForgotPasswordPage() {
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
