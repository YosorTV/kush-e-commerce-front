import { FC } from 'react';

import { NextLink, Title } from '@/components/elements';
import { Price, Wishlist } from '@/components/simple';
import AnimatedImage from '@/components/simple/AnimatedImage';

import { cn } from '@/lib';
import { Link } from '@/lib/navigation';

import { ProductCardProps } from '@/types/components';

export const ProductCard: FC<ProductCardProps> = ({ product, className, session = null, currency = 41, t }) => {
  return (
    <figure className={cn('grid cursor-pointer', className)}>
      <div className='relative'>
        <AnimatedImage product={product} />
        <span className='absolute left-0 top-0 z-[3] bg-neutral p-2 text-base-300'>{product.hintText}</span>
      </div>
      <figcaption className='flex w-full flex-col'>
        <div className='flex h-6 flex-1 items-center justify-between'>
          <NextLink href={`/catalog/${product.slug}`}>
            <Title level='3' className='font-semibold'>
              {product.title}
            </Title>
          </NextLink>
          <Wishlist
            session={session}
            locale={product.locale}
            productId={product.id}
            inWishlist={product?.inWishlist ?? false}
          />
        </div>

        <div className='h-6'>
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
        </div>
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
