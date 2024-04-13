import { ProductsSection } from '@/components/complex';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';

const productsQP = generateStrapiQuery(STRAPI_API_ROUTES.listOfProducts);

export default async function Products() {
  const data = await getStrapiData('products-page', productsQP);

  return (
    <div className='container h-full w-full'>
      <ProductsSection data={data?.products?.data} />
    </div>
  );
}
