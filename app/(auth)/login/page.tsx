import { NextLink } from '@/components/elements';
import { SignInForm } from '@/components/forms';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { PageProps } from '@/types/app/page.types';
import { StripeLinkType } from '@/types/components';
import { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { locale } = searchParams;
  const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta({ locale }));
  const data = await getStrapiData('login-page', metaQP);

  const { seo } = data;

  return {
    title: {
      default: `KUSH | ${seo?.metaTitle?.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: seo?.metaDescription,
  };
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { locale } = searchParams;
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
    <div className='container flex h-full flex-col items-center justify-center gap-y-5'>
      <div className='w-1/3'>
        <SignInForm
          formFields={data?.formFields}
          submitBtn={data?.submitBtn}
          providers={data?.providers}
        />
      </div>
      <div className='flex gap-x-5'>{printLinks(data?.additionalLinks)}</div>
    </div>
  );
}
