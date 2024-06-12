import { FC } from 'react';

import { AnimatedImage } from '@/components/simple';
import { NextLink, Title } from '@/components/elements';

import { cn } from '@/lib';
import { formatPrice } from '@/helpers/formatters';

import { Product } from '@/types/components';

type ProductCardProps = {
  product: Product;
  className: string;
  hintText?: string;
};

export const ProductCard: FC<ProductCardProps> = ({
  product,
  className,
  hintText,
}) => {
  return (
    <figure
      key={product.id}
      className={cn('relative grid cursor-pointer', className)}
    >
      <NextLink href={`/catalog/${product.id}`}>
        <AnimatedImage product={product} />
      </NextLink>

      <figcaption className='flex w-full flex-col pt-2'>
        <span className='text-secondary'>{product.hintText}</span>
        <div className='flex flex-1 justify-between pt-2'>
          <Title
            level='3'
            className='text-lg font-semibold uppercase text-base-200'
          >
            {product.title}
          </Title>
        </div>
        <div className='flex flex-col pt-2'>
          <p className='text-base font-medium text-base-200'>
            {product.description}
          </p>
          <div className='flex w-full items-center justify-between'>
            {hintText && <span className='text-sm'>{hintText}</span>}
            <span className='text-base text-base-200'>
              {formatPrice(Number(product.price))}
            </span>
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
