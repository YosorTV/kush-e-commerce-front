import { FC } from 'react';

import { Product, ProductsContentProps } from '@/types/components';
import { ProductCard } from '@/components/simple';

export const ProductsContent: FC<ProductsContentProps> = ({ products }) => {
  const printProducts = (product: Product, index: number) => {
    const isSecondLineSpecial = Math.floor(index / 5) % 2 === 1;
    const adjustedIndex = index % 5;
    const shouldSpan = isSecondLineSpecial && adjustedIndex === 2;

    return (
      <ProductCard
        key={product.id}
        product={product}
        className={shouldSpan ? 'col-span-2' : 'col-span-1'}
      />
    );
  };

  return (
    <div className='grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
      {products.map(printProducts)}
    </div>
  );
};
