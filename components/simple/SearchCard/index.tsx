'use client';

import { FC } from 'react';

import { AnimatedImage } from '@/components/simple';
import { NextLink, Title } from '@/components/elements';

import { cn } from '@/lib';

import { Product } from '@/types/components';
import { Link } from '@/lib/navigation';
import { Price } from '../Price';
// import { getCurrency } from '@/services';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export const SearchCard: FC<ProductCardProps> = ({ product, className }) => {
  return (
    <figure
      key={product.id}
      className={cn('relative grid cursor-pointer', className)}
    >
      <NextLink className='relative' href={`/catalog/${product.slug}`}>
        <AnimatedImage product={product} />
        <span className='absolute left-0 top-0 z-[3] bg-neutral p-2 text-base-300'>
          {product.hintText}
        </span>
      </NextLink>

      <figcaption className='flex w-full flex-col py-2'>
        <div className='flex flex-1 justify-between'>
          <Title
            level='3'
            className='text-lg font-semibold uppercase text-base-200'
          >
            {product.title}
          </Title>
        </div>
        <div>
          {product?.collections &&
            product.collections.data.map((collection) => (
              <Link
                className='link-hover link flex gap-x-2 underline-offset-8'
                key={collection.slug}
                href={`/collection/${collection.slug}`}
              >
                {collection.title}
              </Link>
            ))}
        </div>
        <div className='flex flex-col pt-2'>
          <p
            className='line-clamp-1 w-3/4 text-base font-medium text-base-200'
            title={product.description}
          >
            {product.description}
          </p>
          <div className='flex w-full items-baseline justify-between'>
            <Price
              currency={41}
              price={product?.price}
              sale={product?.saleValue}
              locale={product.locale}
            />
          </div>
        </div>
      </figcaption>
    </figure>
  );
};