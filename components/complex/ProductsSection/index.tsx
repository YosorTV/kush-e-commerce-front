import { Card } from '@/components/elements/Card';
import React from 'react';

export const ProductsSection = ({ data }: any) => {
  const printProduct = (product: any) => (
    <Card key={product.id} data={product} />
  );

  return (
    <section className='w-full py-5'>
      <div className='grid grid-cols-fluid place-items-center items-start gap-5'>
        {data?.map(printProduct)}
      </div>
    </section>
  );
};
