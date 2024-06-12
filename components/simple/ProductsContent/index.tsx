'use client';

import { FC, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { cn } from '@/lib';
import { useProducts } from '@/store';

import { ProductCardSkeleton } from '@/components/skeletons';
import { Button, Title } from '@/components/elements';
import { ProductCard } from '@/components/simple';

import { cormorant } from '@/assets/fonts';

import { Product } from '@/types/components';

interface TProductsContent {
  className?: string;
  title?: string;
}

export const ProductsContent: FC<TProductsContent> = ({ className, title }) => {
  const t = useTranslations();
  const params = useSearchParams();
  const locale = useLocale();
  const state = useProducts();

  const category = params.get('category');
  const isLastPage = state.meta.page === state.meta.pageCount;

  useEffect(() => {
    state.fetchProducts({
      locale,
      page: 1,
      pageSize: Boolean(category) ? 5 : 4,
      category: category ?? '*',
    });

    return () => state.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, locale]);

  const handleMore = () => {
    state.fetchMoreProducts({
      locale,
      category,
      pageSize: Boolean(category) ? 5 : 4,
      page: state.meta.page + 1,
    });
  };

  const gridCols = (index: number) => {
    if (index % 5 === 0)
      return 'col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1';
    if (index % 5 === 1)
      return 'col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1';
    if (index % 5 === 2)
      return 'col-span-1 lg:col-span-2 xl:col-span-1 xxl:col-span-2';
    if (index % 5 === 3) return 'col-span-1 xl:col-span-3 xxl:col-span-1';

    return 'col-span-1';
  };

  const printProducts = useCallback(
    (product: Product, index: number) => {
      const number = product.available_colors.length;
      const hintText = t('colors.availableIn', { number });

      return (
        <ProductCard
          hintText={hintText}
          key={product.id}
          product={product}
          className={gridCols(index)}
        />
      );
    },
    [t]
  );

  return (
    <div
      className={cn(
        'relative flex min-h-[600px] flex-col justify-between',
        className
      )}
    >
      {title && (
        <Title
          level='3'
          className={cn(
            cormorant.className,
            'text-center text-5xl font-normal uppercase text-base-200 lg:text-left'
          )}
        >
          {title}
        </Title>
      )}

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-5'>
        {state.isLoading && !state.products.length && !Boolean(category) ? (
          <ProductCardSkeleton length={4} />
        ) : (
          state.products.map(printProducts)
        )}
      </div>

      {state.meta.total > 0 && (
        <div className='flex flex-col items-center justify-center py-6 pb-10 lg:pt-16'>
          <span className='text-sm font-medium uppercase text-base-200'>
            {t('system.total', { number: state.meta.total })}
          </span>
          <Button
            className='btn-link'
            disabled={isLastPage}
            onClick={handleMore}
          >
            {state.isLoading && <span className='loading loading-spinner' />}
            <span>{t('system.loadMore')}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsContent;
