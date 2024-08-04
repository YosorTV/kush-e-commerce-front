import { FC } from 'react';

import { cn } from '@/lib';

import { Title } from '@/components/elements';

import { cormorant } from '@/assets/fonts';
import { getProductsData } from '@/services';
import { getLocale, getTranslations } from 'next-intl/server';
import { Product } from '@/types/components';
import { ProductCard } from '../ProductCard';
import { ProductListController } from '../ProductListController';
import { gridCols } from '@/helpers/formatters';

import { Lottie } from '@/components/elements/Lottie';
import lottieAnim from '@/public/LottieEmplyList.json';

interface IProductsList {
  className?: string;
  title?: string;
  [key: string]: string;
}

export const ProductList: FC<IProductsList> = async ({
  className,
  title,
  ...rest
}) => {
  const locale = await getLocale();
  const t = await getTranslations();

  const { data, meta } = await getProductsData({
    locale,
    pageSize: rest?.pageSize ?? 4,
    ...rest,
  });

  const isLastPage =
    meta.pagination.page === meta.pagination.pageCount || !data.length;

  const printProduct = (product: Product, index: number) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        className={gridCols(index)}
      />
    );
  };

  return (
    <section
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

      {data.length > 0 ? (
        <div className='grid min-h-96 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-5'>
          {data.map(printProduct)}{' '}
        </div>
      ) : (
        <Lottie
          text={t('system.emptyList')}
          src={lottieAnim}
          playerClassName='h-96 w-96'
        />
      )}

      <ProductListController
        total={meta.pagination.total}
        disabled={isLastPage}
        perPage={meta?.pagination?.pageSize * 2}
      />
    </section>
  );
};
