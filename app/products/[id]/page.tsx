import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';

export default async function ProductDetails({ params }: any) {
  const productDetailsQP = generateStrapiQuery(
    STRAPI_API_ROUTES.getProductDetails
  );

  const data = await getStrapiData(`products/${params.id}`, productDetailsQP);

  return (
    <section className='container h-full'>
      <p>Details</p>
    </section>
  );
}
