import { SignUpForm } from '@/components/forms';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { Metadata } from 'next';

const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta);
const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.auth.registration);

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStrapiData('registration-page', metaQP);

  return {
    title: {
      default: `KUSH | ${data?.title?.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: data?.description,
  };
}

export default async function SignUpPage() {
  const data = await getStrapiData('registration-page', pageQP);

  return (
    <div className='container flex h-full flex-col items-center justify-center gap-y-5'>
      <div className='w-1/3'>
        <SignUpForm formFields={data.formFields} cta={data.submitBtn} />
      </div>
    </div>
  );
}
