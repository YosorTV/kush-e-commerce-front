import { Metadata } from 'next';
import { getMetadata, getSignInData } from '@/services';

import { NextLink } from '@/components/elements';
import { SignInForm } from '@/components/forms';
import { PageLayout } from '@/components/layouts';

import { STRAPI_PAGES } from '@/helpers/constants';

import { StrapiLinkType } from '@/types/components';
import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.signin, locale });

  return response;
}

export default async function LoginPage({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getSignInData({ locale });

  const printLinks = (links: StrapiLinkType[]) => {
    if (!links) return;

    return links.map((link: StrapiLinkType) => (
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
    <PageLayout className='container h-screen'>
      <section className='flex h-full flex-col items-center justify-center gap-y-5'>
        <div className='w-1/3'>
          <SignInForm
            formFields={data?.formFields}
            submitBtn={data?.submitBtn}
            providers={data?.providers}
          />
        </div>
        <div className='flex gap-x-5'>{printLinks(data?.additionalLinks)}</div>
      </section>
    </PageLayout>
  );
}
