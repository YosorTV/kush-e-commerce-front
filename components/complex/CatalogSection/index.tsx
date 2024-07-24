import { ProductsContent, ProductsController } from '@/components/simple';

import { FC } from 'react';

interface ICatalogSection {
  title?: string;
  filterForm?: any;
}

export const CatalogSection: FC<ICatalogSection> = async ({ title }) => {
  return (
    <section className='p-5'>
      <ProductsController title={title} />
      <ProductsContent className='pt-5' />
    </section>
  );
};
