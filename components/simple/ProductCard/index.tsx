import { FC } from 'react';

import { Title } from '@/components/elements';
import { Price, Wishlist } from '@/components/simple';
import AnimatedImage from '@/components/simple/AnimatedImage';

import { cn } from '@/lib';
import { Link } from '@/lib/navigation';

import { ProductCardProps } from '@/types/components';

export const ProductCard: FC<ProductCardProps> = ({ product, className, currency = 41, t }) => {
  return (
    <figure className={cn('relative grid cursor-pointer', className)}>
      <div className='relative'>
        <AnimatedImage product={product} />
        <span className='absolute left-0 top-0 z-[3] bg-neutral p-2 text-base-300'>{product.hintText}</span>
      </div>
      <figcaption className='flex w-full flex-col py-2'>
        <div className='flex flex-1 items-center justify-between'>
          <Title level='3' className='font-semibold'>
            {product.title}
          </Title>
          <Wishlist locale={product.locale} productId={product.id} inWishlist={product?.inWishlist ?? false} />
        </div>

        {product?.collections &&
          product.collections.data.map((collection) => (
            <Link
              className='link-hover link flex gap-x-2 underline-offset-8'
              key={collection.slug}
              href={`/collection/${collection.slug}`}
            >
              {t('collection')}&nbsp;{collection.title}
            </Link>
          ))}

        <div title={product.description} className='group flex flex-col pt-2'>
          <p className='line-clamp-1 w-1/2 text-base font-medium text-base-200 transition-all duration-300 group-hover:w-full'>
            {product.description}
          </p>
          <div className='flex w-full items-end justify-between'>
            <span className='text-sm'>{t('available', { number: product.quantity })}</span>
            <Price currency={currency} price={product?.price} sale={product?.saleValue} />
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
