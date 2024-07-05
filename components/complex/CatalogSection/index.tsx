import { ProductsContent, ProductsController } from '@/components/simple';

export const CatalogSection = () => {
  return (
    <section className='px-5'>
      <div>
        <ProductsController />
        <ProductsContent className='pt-6' />
      </div>
    </section>
  );
};
