import { ProductsSection } from '@/components/complex';
import { Pagination } from '@/components/simple/Pagination';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta);
  const data = await getStrapiData('products-page', metaQP);

  return {
    title: {
      default: `KUSH | ${data?.title?.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: data?.description,
  };
}

export default async function Products({ searchParams }: any) {
  const { id } = await getStrapiData('products-page');

  if (!id) notFound();

  const queryParams = STRAPI_API_ROUTES.getProducts({ id, ...searchParams });
  const productsQP = generateStrapiQuery(queryParams);

  const data = await getStrapiData('get-products', productsQP);

  return (
    <section className='container mb-5 h-max'>
      <ProductsSection data={data?.products} message={data?.message} />
      <Pagination
        total={data?.total}
        hasPrevPage={data?.hasPreviousPage}
        hasNextPage={data?.hasNextPage}
      />
    </section>
  );
}
