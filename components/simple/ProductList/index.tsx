import { FC } from 'react';
import { getLocale } from 'next-intl/server';

import { cn } from '@/lib';

import { Title } from '@/components/elements';

import { getProductsData } from '@/services';

import ProductListGroup from '../ProductListGroup';
import { PaginateController } from '../PaginateController';

interface IProductsList {
  title?: string;
  className?: string;
  [key: string]: string;
}

export const ProductList: FC<IProductsList> = async ({ className, title, ...rest }) => {
  const locale = await getLocale();

  const { data, meta } = await getProductsData({ locale, ...rest });

  const isLastPage = meta.pagination.page === meta.pagination.pageCount || !data.length;

  return (
    <section className={cn('relative flex h-max flex-col justify-between', className)}>
      {title && (
        <Title
          level='3'
          variant='subheading'
          className='py-2.5 text-2xl uppercase text-base-200 xs:text-4xl md:py-5 lg:text-5xl'
        >
          {title}
        </Title>
      )}
      <ProductListGroup data={data} />
      <PaginateController
        disabled={isLastPage}
        total={meta.pagination.total}
        perPage={meta?.pagination?.pageSize + 5}
      />
    </section>
  );
};
