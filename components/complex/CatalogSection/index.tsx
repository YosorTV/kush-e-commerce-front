import { ProductsController } from '@/components/simple';
import { ProductList } from '@/components/simple/ProductList';

import { FC } from 'react';

interface ICatalogSection {
  title?: string;
  filterForm?: any;
}

export const CatalogSection: FC<ICatalogSection> = async ({
  title,
  ...rest
}) => {
  return (
    <section className='p-5'>
      <ProductsController title={title} />
      <ProductList className='pt-5' {...rest} />
    </section>
  );
};
