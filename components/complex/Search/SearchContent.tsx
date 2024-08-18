'use client';

import { SearchCard } from '@/components/simple';
import { gridCols } from '@/helpers/formatters';

import { useSearch } from '@/store';
import { Product } from '@/types/components';

export const SearchContent = () => {
  const state = useSearch();

  const printProducts = (product: Product, index: number) => {
    return <SearchCard key={product.id} product={product} className={gridCols(index)} />;
  };

  return (
    <div className='xxl:grid-cols-5 grid grid-cols-1 gap-5 py-12 md:grid-cols-2 xl:grid-cols-3'>
      {state.searchResult.map(printProducts)}
    </div>
  );
};
