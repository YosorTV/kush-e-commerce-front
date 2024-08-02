'use client';

import { FC, useEffect, useMemo } from 'react';
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
  const locale = useLocale();
  const state = useProducts();

  const params = useSearchParams();
  const isLastPage = state.meta.page === state.meta.pageCount;

  const options = useMemo(
    () => ({
      sizes: params.getAll('sizes'),
      categories: params.getAll('categories'),
      materials: params.getAll('materials'),
      sortBy: params.get('sortBy') ?? 'recommended',
    }),
    [params]
  );

  useEffect(() => {
    state.fetchProducts({
      locale,
      page: 1,
      pageSize: 5,
      ...options,
    });

    return () => state.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, options]);

  const handleMore = () => {
    state.fetchMoreProducts({
      locale,
      pageSize: 5,
      page: state.meta.page + 1,
      ...options,
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

  const printProducts = () => {
    if (state.isLoading && !state.products.length) {
      return <ProductCardSkeleton customGrid length={4} />;
    }

    if (state.products.length > 0) {
      return state.products.map((product: Product, index: number) => {
        const hintText = t('color.availableIn', {
          number: product.colors?.data?.length,
        });

        const collectionText = t('collection.title');

        return (
          <ProductCard
            currency={state.currency}
            locale={locale}
            hintText={hintText}
            collectionTitle={collectionText}
            key={product.id}
            product={product}
            className={gridCols(index)}
          />
        );
      });
    }

    return (
      <div>
        <p>Empty list</p>
      </div>
    );
  };

  return (
    <div
      className={cn('relative flex h-max flex-col justify-between', className)}
    >
      {title && (
        <Title
          level='3'
          className={cn(
            cormorant.className,
            'py-5 text-2xl uppercase text-base-200 xs:text-4xl lg:text-5xl'
          )}
        >
          {title}
        </Title>
      )}

      <div className='grid min-h-96 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-5'>
        {printProducts()}
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
