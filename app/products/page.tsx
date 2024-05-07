import { ProductsSection } from '@/components/complex';
import { Pagination } from '@/components/simple/Pagination';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const metaQP = generateStrapiQuery(
    STRAPI_API_ROUTES.meta({ ...searchParams })
  );
  const data = await getStrapiData('products-page', metaQP);

  const { seo } = data;

  return {
    title: {
      default: `KUSH | ${seo?.metaTitle?.toUpperCase()}`,
      template: '%s | KUSH',
    },
    description: seo?.metaDescription,
  };
}

export default async function Products({ searchParams }: PageProps) {
  const { locale } = searchParams;

  const productPageQueryParams = STRAPI_API_ROUTES.products({ locale });
  const productsPageQP = generateStrapiQuery(productPageQueryParams);

  const { id } = await getStrapiData('products-page', productsPageQP);

  if (!id) notFound();

  const queryParams = STRAPI_API_ROUTES.getProducts({ id, ...searchParams });
  const productsListQP = generateStrapiQuery(queryParams);

  const data = await getStrapiData('get-products', productsListQP);

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
