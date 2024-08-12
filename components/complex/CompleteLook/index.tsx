import { completeLookAdapter } from '@/adapters/product';
import Carousel from '@/components/elements/Carousel';
import { ProductCard } from '@/components/simple';
import { cn } from '@/lib';
import { getProductsData } from '@/services';
import { Product } from '@/types/components';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

interface ICompleteLook {
  locale: string;
  category: string;
  currency: number;
  className?: string;
}

export const CompleteLook: FC<ICompleteLook> = async ({ locale, category, className }) => {
  const { data: products } = await getProductsData({ locale });
  const t = await getTranslations();

  const data = completeLookAdapter({ products, category });

  const printProduct = (product: Product) => {
    return (
      <ProductCard key={product.id} product={product} className='embla__slide cursor-grab active:cursor-grabbing' />
    );
  };

  return (
    <Carousel
      format='standart'
      title={t('system.look')}
      titleClass='text-base-200 py-6 xs:py-3 pl-3 md:pl-0'
      className={cn('mx-2.5 pb-6 md:mx-5', className)}
      options={{ loop: true }}
    >
      {data.map(printProduct)}
    </Carousel>
  );
};
