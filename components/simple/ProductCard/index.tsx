import { FC } from 'react';

import { Price, Wishlist } from '@/components/simple';
import { NextLink, Title } from '@/components/elements';
import AnimatedImage from '@/components/simple/AnimatedImage';

import { cn } from '@/lib';
import { Link } from '@/lib/navigation';

import { Product } from '@/types/components';

type ProductCardProps = {
  product: Product;
  className?: string;
  currency?: number;
};

export const ProductCard: FC<ProductCardProps> = ({ product, className, currency = 41 }) => {
  const collectionTitlePrefix = product.locale === 'uk' ? 'Коллекція: ' : 'Collection: ';
  const availableTitlePrefix =
    product.locale === 'uk' ? `У наявності: ${product.quantity}` : `Available in: ${product.quantity}`;

  return (
    <figure className={cn('relative grid cursor-pointer', className)}>
      <NextLink className='relative' href={`/catalog/${product.slug}`}>
        <AnimatedImage product={product} />
        <span className='absolute left-0 top-0 z-[3] bg-neutral p-2 text-base-300'>{product.hintText}</span>
      </NextLink>

      <figcaption className='flex w-full flex-col py-2'>
        <div className='flex flex-1 items-center justify-between'>
          <Title level='3' className='font-semibold'>
            {product.title}
          </Title>
          <Wishlist locale={product.locale} productId={product.id} inWishlist={product?.inWishlist ?? false} />
        </div>
        <div className='h-6'>
          {product?.collections &&
            product.collections.data.map((collection) => (
              <Link
                className='link-hover link flex gap-x-2 underline-offset-8'
                key={collection.slug}
                href={`/collection/${collection.slug}`}
              >
                {collectionTitlePrefix} {collection.title}
              </Link>
            ))}
        </div>
        <div className='flex flex-col pt-2'>
          <p className='line-clamp-1 w-3/4 text-base font-medium text-base-200'>{product.description}</p>
          <div className='flex w-full items-end justify-between'>
            <span className='text-sm'>{availableTitlePrefix}</span>
            <Price currency={currency} price={product?.price} sale={product?.saleValue} />
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
