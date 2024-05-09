import { NextLink } from '@/components/elements';
import { SignInForm } from '@/components/forms';
import { PageLayout } from '@/components/layouts';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { PageProps } from '@/types/app/page.types';
import { StripeLinkType } from '@/types/components';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params;

  const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta({ locale }));
  const { seo } = await getStrapiData('login-page', metaQP);

  return {
    title: {
      default: `KUSH | ${seo?.metaTitle?.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: seo?.metaDescription,
  };
}

export default async function LoginPage({ params }: PageProps) {
  const { locale } = params;

  const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.auth({ locale }).login);
  const data = await getStrapiData('login-page', pageQP);

  const printLinks = (links: StripeLinkType[]) => {
    if (!links) return;

    return links.map((link: StripeLinkType) => (
      <NextLink
        key={link.id}
        href={link.url}
        replace={link.isExternal}
        className='link link-primary'
      >
        {link.text}
      </NextLink>
    ));
  };

  return (
    <PageLayout className='container'>
      <div className='flex h-full flex-col items-center justify-center gap-y-5'>
        <div className='w-1/3'>
          <SignInForm
            formFields={data?.formFields}
            submitBtn={data?.submitBtn}
            providers={data?.providers}
          />
        </div>
        <div className='flex gap-x-5'>{printLinks(data?.additionalLinks)}</div>
      </div>
    </PageLayout>
  );
}
