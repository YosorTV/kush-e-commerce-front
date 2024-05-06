import { NextLink } from '@/components/elements';
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
  const { seo } = await getStrapiData('success-page', metaQP);

  return {
    title: {
      default: `KUSH | ${seo?.metaTitle}`,
      template: '%s | KUSH',
    },
    description: seo?.metaDescription,
  };
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { locale } = searchParams;

  const pageQP = generateStrapiQuery(
    STRAPI_API_ROUTES.auth({ locale }).success
  );

  const data = await getStrapiData('success-page', pageQP);

  return (
    <div className='container flex h-full flex-col items-center justify-center gap-y-2.5'>
      <h1 className='text-center text-lg font-semibold'>{data.title}</h1>
      <p>{data.description}</p>
      <NextLink href={data?.redirectUrl?.url} className='link link-primary'>
        {data?.redirectUrl?.text}
      </NextLink>
    </div>
  );
}
