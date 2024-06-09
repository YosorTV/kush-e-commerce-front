'use client';

import { FC, useState } from 'react';
import { Product } from '@/types/components';
import { StrapiImage } from '../StrapiImage';
import { NextLink, Title } from '@/components/elements';
import { formatPrice } from '@/helpers/formatters';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib';
import { useTranslations } from 'next-intl';

type ProductCardProps = {
  product: Product;
  className: string;
};

export const ProductCard: FC<ProductCardProps> = ({ product, className }) => {
  const t = useTranslations();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleShowOverlay = () => setShowOverlay(true);
  const handleHideOverlay = () => setShowOverlay(false);

  const imageVariants = {
    enter: {
      opacity: 0,
      zIndex: 1,
    },
    visible: {
      opacity: 1,
      zIndex: 2,
      transition: {
        duration: 0.3,
        type: 'tween',
      },
    },
    exit: {
      opacity: 0,
      zIndex: 1,
      transition: {
        duration: 0.3,
        type: 'tween',
      },
    },
  };

  return (
    <figure
      className={cn('relative grid cursor-pointer', className)}
      key={product.id}
    >
      <motion.div
        onHoverStart={handleShowOverlay}
        onHoverEnd={handleHideOverlay}
        className={cn(
          'relative min-h-[480px] border border-base-100',
          showOverlay && 'border-base-200'
        )}
      >
        <NextLink href={`/catalog/${product.id}`}>
          <AnimatePresence initial={false} mode='sync'>
            {showOverlay ? (
              <motion.div
                key={`${product.id}-${Math.random()}`}
                initial='enter'
                animate='visible'
                exit='exit'
                variants={imageVariants}
                className='absolute left-0 top-0 h-full w-full'
              >
                <StrapiImage
                  height={1000}
                  width={1000}
                  src={product?.images.data?.[1]?.url}
                  alt={product?.images.data?.[1]?.alternativeText}
                  className='h-full w-full object-cover'
                />
              </motion.div>
            ) : (
              <motion.div
                key={`${product.id}-${Math.random()}`}
                initial='enter'
                animate='visible'
                exit='exit'
                variants={imageVariants}
                className='absolute left-0 top-0 h-full w-full'
              >
                <StrapiImage
                  height={1000}
                  width={1000}
                  src={product?.images.data?.[0]?.url}
                  alt={product?.images.data?.[0]?.alternativeText}
                  className='h-full w-full object-cover'
                />
              </motion.div>
            )}
          </AnimatePresence>
        </NextLink>
      </motion.div>

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
            <span className='text-sm'>
              {t('colors.availableIn', {
                number: product.available_colors.length,
              })}
            </span>
            <span className='text-base text-base-200'>
              {formatPrice(Number(product.price))}
            </span>
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
