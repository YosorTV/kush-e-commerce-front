'use client';

import { FC } from 'react';

import { AnimatedImage } from '@/components/simple';
import { NextLink, Title } from '@/components/elements';
import { motion } from 'framer-motion';

import { cn } from '@/lib';

import { Product } from '@/types/components';
import { Link } from '@/lib/navigation';

type ProductCardProps = {
  product: Product;
  className: string;
  hintText?: string;
  collectionTitle?: string;
};

export const ProductCard: FC<ProductCardProps> = ({
  product,
  className,
  hintText,
  collectionTitle,
}) => {
  console.log(product);
  return (
    <motion.figure
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      key={product.id}
      className={cn('relative grid cursor-pointer', className)}
    >
      <NextLink className='relative' href={`/catalog/${product.id}`}>
        <AnimatedImage product={product} />
        <span className='absolute left-0 top-0 z-10 bg-neutral p-2 text-base-300'>
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
                {collectionTitle} {collection.title}
              </Link>
            ))}
        </div>
        <div className='flex flex-col pt-2'>
          <p className='text-base font-medium text-base-200'>
            {product.description}
          </p>
          <div className='flex w-full items-center justify-between'>
            {hintText && <span className='text-sm'>{hintText}</span>}
            <span className='text-base text-base-200'>{product.price}</span>
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
};
