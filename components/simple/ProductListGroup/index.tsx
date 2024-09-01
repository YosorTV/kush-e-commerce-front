import { FC } from 'react';
import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib';

import { Lottie } from '@/components/elements/Lottie';

import { Product } from '@/types/components';
import { gridCols } from '@/helpers/formatters';
import { ProductCard } from '../ProductCard';

import lottieAnim from '@/public/LottieEmplyList.json';
import { auth } from '@/auth';
import { getCurrency } from '@/services';

interface IProductListGroup {
  data: Product[];
  className?: string;
}

const ProductListGroup: FC<IProductListGroup> = async ({
  data,
  className = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
}) => {
  const session = await auth();
  const currency = await getCurrency();
  const t = await getTranslations('system');

  const printProduct = (product: Product, index: number) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        currency={currency}
        session={session}
        className={gridCols(index)}
      />
    );
  };

  if (!data.length) return <Lottie text={t('emptyList')} src={lottieAnim} playerClassName='h-96 w-96' />;

  return (
    <div className={cn('grid min-h-96 gap-5', className, data.length >= 4 && 'grid-cols-fluid')}>
      {data.map(printProduct)}
    </div>
  );
};

export default ProductListGroup;
