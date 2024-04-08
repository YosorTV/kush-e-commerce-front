import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib/qs';
// import { blockRenderer } from '@/lib/utils';
import { getStrapiData } from '@/services/strapi';
import { Metadata } from 'next';

const homeQP = generateStrapiQuery(STRAPI_API_ROUTES.home);
const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta);

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStrapiData('home-page', metaQP);

  return {
    title: data?.title,
    description: data?.description,
  };
}

export default async function Home() {
  const data = await getStrapiData('home-page', homeQP);

  if (!data?.blocks) return <p>No sections found</p>;

  return (
    <div className='text-center'>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
    </div>
  );
}
