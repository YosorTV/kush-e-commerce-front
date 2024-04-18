import { Card, Title } from '@/components/elements';
import { ProductsController } from '@/components/simple';

export const ProductsSection = ({ data, message }: any) => {
  const printProduct = (product: any) => (
    <Card key={product.id} data={product} />
  );

  return (
    <>
      <ProductsController
        search={{ placeholder: 'Search' }}
        className='flex flex-1 items-center justify-center pb-10'
      />
      <div className='mb-5 grid grid-cols-fluid place-items-center items-start gap-5'>
        {!message ? (
          data?.map(printProduct)
        ) : (
          <Title level='2'>{message}</Title>
        )}
      </div>
    </>
  );
};
