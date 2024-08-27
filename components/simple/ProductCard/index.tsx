import { FC } from 'react';

import { AnimatedImage } from '@/components/simple';
import { NextLink, Title } from '@/components/elements';

import { cn } from '@/lib';

import { Product } from '@/types/components';
import { Link } from '@/lib/navigation';
import { Price } from '../Price';
import { getTranslations } from 'next-intl/server';
import Wishlist from '../Wishlist';

type ProductCardProps = {
  product: Product;
  className?: string;
  currency?: number;
  session: any;
};

export const ProductCard: FC<ProductCardProps> = async ({ product, session, className, currency = 41 }) => {
  const t = await getTranslations();

  return (
    <figure key={product.id} className={cn('relative grid cursor-pointer', className)}>
      <NextLink className='relative' href={`/catalog/${product.slug}`}>
        <AnimatedImage product={product} />
        <span className='absolute left-0 top-0 z-[3] bg-neutral p-2 text-base-300'>{product.hintText}</span>
      </NextLink>

      <figcaption className='flex w-full flex-col py-2'>
        <div className='flex flex-1 items-center justify-between'>
          <Title level='3' className='font-semibold'>
            {product.title}
          </Title>
          <Wishlist
            token={session?.accessToken}
            locale={product.locale}
            productId={product.id}
            inWishlist={product?.inWishlist ?? false}
            userId={session?.user?.id}
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
                {t('collection.title')} {collection.title}
              </Link>
            ))}
        </div>
        <div className='flex flex-col pt-2'>
          <p className='line-clamp-1 w-3/4 text-base font-medium text-base-200'>{product.description}</p>
          <div className='flex w-full items-end justify-between'>
            <span className='text-sm'>{t('system.availableIn', { number: product.quantity })}</span>
            <Price currency={currency} price={product?.price} sale={product?.saleValue} locale={product.locale} />
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
