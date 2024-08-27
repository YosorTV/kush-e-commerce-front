import { FC } from 'react';

import { cn } from '@/lib';

import { Title } from '@/components/elements';

import { cormorant } from '@/assets/fonts';
import { getProductsData } from '@/services';
import { getLocale } from 'next-intl/server';
import { ProductListController } from '../ProductListController';

import ProductListGroup from '../ProductListGroup';
import Modal from '@/components/complex/Modal';
import { WishlistNotification } from '../WishlistNotification';

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
          className={cn(cormorant.className, 'text-2xl uppercase text-base-200 xs:text-4xl lg:text-5xl')}
        >
          {title}
        </Title>
      )}
      <ProductListGroup data={data} />
      <ProductListController
        disabled={isLastPage}
        total={meta.pagination.total}
        perPage={meta?.pagination?.pageSize * 2}
      />
      <Modal id='my_modal_3'>
        <WishlistNotification locale={locale} />
      </Modal>
    </section>
  );
};
