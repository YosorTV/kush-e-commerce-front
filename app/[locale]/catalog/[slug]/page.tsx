import { ProductContent } from '@/components/complex/ProductContent';
import { PageLayout } from '@/components/layouts';
import { getProductData } from '@/services/api/get-product';

import { PageProps } from '@/types/app/page.types';

export default async function ProductDetails({ params }: PageProps) {
  const { locale, slug } = params;

  const { data } = await getProductData({ locale, slug });

  // const cartData = {
  //   id: data.product.id,
  //   image: data.product.cover,
  //   name: data.product.title,
  //   unit_amount: data.product.unitAmount,
  //   price: data.product.price,
  // };

  return (
    <PageLayout>
      <div className='flex w-full justify-between'>
        <ProductContent images={data?.images?.data} />
        {data.title}
      </div>
    </PageLayout>
  );
}
