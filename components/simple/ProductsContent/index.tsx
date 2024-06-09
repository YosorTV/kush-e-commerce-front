'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { cn } from '@/lib';
import { useProducts } from '@/store';

import { Button, Title } from '@/components/elements';
import { ProductCard } from '@/components/simple';

import { Product } from '@/types/components';
import { useScreen } from '@/lib/hooks';
import { cormorant } from '@/assets/fonts';

export const ProductsContent = ({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) => {
  const locale = useLocale();
  const state = useProducts();
  const params = useSearchParams();
  const t = useTranslations();

  const [cellSizes, setCellSizes] = useState<number[]>([1, 2, 1, 1, 1]);

  const category = params.get('category');
  const isLastPage = state.meta.page === state.meta.pageCount;

  const { xxl, xl, lg } = useScreen();

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

  useEffect(() => {
    if (xxl) setCellSizes([1, 1, 2, 1, 1]);
    if (xl) setCellSizes([2, 1, 1, 2, 1, 1]);
    if (lg) setCellSizes([1, 1, 1, 1, 1]);
  }, [xxl, xl, lg]);

  const gridCondition = (index: number) => {
    return cellSizes[index % cellSizes.length];
  };

  const handleMore = () => {
    state.fetchMoreProducts({
      locale,
      category,
      pageSize: Boolean(category) ? 5 : 4,
      page: state.meta.page + 1,
    });
  };

  const printProducts = (product: Product, index: number) => {
    const cellSize = gridCondition(index);

    return (
      <ProductCard
        key={product.id}
        product={product}
        className={`col-span-${cellSize}`}
      />
    );
  };

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
            'text-2xl font-normal  uppercase text-base-200 md:text-3xl lg:text-5xl'
          )}
        >
          {title}
        </Title>
      )}
      <div className='xxl:grid-cols-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {state.products.map(printProducts)}
      </div>
      {state.meta.total > 0 && (
        <div className='flex flex-col items-center justify-center py-6 lg:py-12'>
          <span className='text-sm font-medium uppercase text-base-200'>
            {state.meta.total} Total
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
