import { NextLink } from '@/components/elements';
import { SignInForm } from '@/components/forms';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { StripeLinkType } from '@/types/components';
import { Metadata } from 'next';

const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta);
const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.auth.login);

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStrapiData('login-page', metaQP);

  return {
    title: {
      default: `KUSH | ${data?.title?.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: data?.description,
  };
}

export default async function LoginPage() {
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
