import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib/qs';
// import { blockRenderer } from '@/lib/utils';
import { getStrapiData } from '@/services/strapi';

const queryParams = generateStrapiQuery(STRAPI_API_ROUTES.home);

export default async function Home() {
  const data = await getStrapiData('home-page', queryParams);

  if (!data?.blocks) return <p>No sections found</p>;

  return (
    <div className='text-center'>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
    </div>
  );
}
