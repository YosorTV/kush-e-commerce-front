'use client';

import { ProductCard } from '@/components/simple';

import { useSearch } from '@/store';
import { Product } from '@/types/components';

export const SearchContent = () => {
  const state = useSearch();

  const printProducts = (product: Product) => {
    return (
      <ProductCard key={product.id} product={product} className='col-span-1' />
    );
  };

  return (
    <div className='grid grid-cols-1 gap-5 pt-12 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-5'>
      {state.searchResult.map(printProducts)}
    </div>
  );
};
