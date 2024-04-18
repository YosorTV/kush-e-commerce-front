import { StrapiBlockRender } from '@/components/simple';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib/qs';
import { getStrapiData } from '@/services/strapi';
import { Metadata } from 'next';

const homeQP = generateStrapiQuery(STRAPI_API_ROUTES.home);
const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta);

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStrapiData('home-page', metaQP);

  return {
    title: {
      default: `KUSH | ${data?.title?.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: data?.description,
  };
}

export default async function Home() {
  const data = await getStrapiData('home-page', homeQP);

  return <StrapiBlockRender data={data?.blocks} />;
}
