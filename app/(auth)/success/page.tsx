import { NextLink } from '@/components/elements';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { Metadata } from 'next';

const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta);
const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.auth.success);

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStrapiData('success-page', metaQP);

  return {
    title: data?.title,
    description: data?.description,
  };
}

export default async function SuccessPage() {
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
