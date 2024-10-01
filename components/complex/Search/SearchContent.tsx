'use client';

import { ProductCard } from '@/components/simple';

import { useSearch } from '@/store';
import { Product } from '@/types/components';

import lottieAnim from '@/public/LottieEmplyList.json';
import { useTranslations } from 'next-intl';
import { Lottie } from '@/components/elements/Lottie';

export const SearchContent = () => {
  const state = useSearch();
  const t = useTranslations('system');

  if (!state.searchResult.length && !state.isLoading) {
    return <Lottie text={t('emptyList')} src={lottieAnim} className='relative top-20' playerClassName='h-96 w-96' />;
  }

  const printProducts = (product: Product) => {
    return <ProductCard t={t} key={product.id} product={product} className='col-span-1' />;
  };

  return <div className='my-10 grid grid-cols-1 gap-5 md:grid-cols-2'>{state.searchResult.map(printProducts)}</div>;
};
