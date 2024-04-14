import { Card, Title } from '@/components/elements';
import { ProductsController } from '@/components/simple';

export const ProductsSection = ({ data }: any) => {
  const printProduct = (product: any) => (
    <Card key={product.id} data={product} />
  );

  return (
    <section className='h-full py-5'>
      <ProductsController
        search={{ placeholder: 'Search' }}
        className='flex flex-1 items-center justify-center pb-10'
      />
      <div className='grid grid-cols-fluid place-items-center items-start gap-5'>
        {data.map(printProduct) || <Title level='2'>Not found</Title>}
      </div>
    </section>
  );
};
