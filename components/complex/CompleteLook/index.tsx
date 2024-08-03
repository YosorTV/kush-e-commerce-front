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

export const CompleteLook: FC<ICompleteLook> = async ({
  locale,
  currency,
  category,
  className,
}) => {
  const { data: products } = await getProductsData({ locale });
  const t = await getTranslations();

  const data = completeLookAdapter({ products, category });

  const printProduct = (product: Product) => {
    const hintText = t('color.availableIn', {
      number: product.colors?.data?.length,
    });

    return (
      <ProductCard
        currency={currency}
        locale={locale}
        hintText={hintText}
        key={product.id}
        product={product}
      />
    );
  };

  return (
    <Carousel
      title={t('system.look')}
      titleClass='text-base-200'
      className={cn('mx-5 pb-6', className)}
      options={{ align: 'start', loop: true }}
    >
      <div className='pt-2.5'>{data.map(printProduct)}</div>
    </Carousel>
  );
};
