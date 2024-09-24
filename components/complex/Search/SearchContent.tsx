'use client';

import { SearchCard } from '@/components/simple';
import { gridCols } from '@/helpers/formatters';

import { useSearch } from '@/store';
import { Product } from '@/types/components';

import lottieAnim from '@/public/LottieEmplyList.json';
import { useTranslations } from 'next-intl';
import { Lottie } from '@/components/elements/Lottie';

export const SearchContent = () => {
  const t = useTranslations('system');
  const state = useSearch();

  if (!state.searchResult.length) {
    return <Lottie text={t('emptyList')} src={lottieAnim} className='relative top-20' playerClassName='h-96 w-96' />;
  }

  const printProducts = (product: Product, index: number) => {
    return <SearchCard key={product.id} product={product} className={gridCols(index)} />;
  };

  return (
    <div className='xxl:grid-cols-5 grid grid-cols-1 gap-5 py-12 md:grid-cols-2 xl:grid-cols-3'>
      {state.searchResult.map(printProducts)}
    </div>
  );
};
