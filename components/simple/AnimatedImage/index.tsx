'use client';

import { FC, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { StrapiImage } from '../StrapiImage';
import { Product } from '@/types/components';
import { cn } from '@/lib';

const imageVariants = {
  enter: {
    opacity: 0,
    zIndex: 1,
  },
  visible: {
    opacity: 1,
    zIndex: 2,
    transition: {
      duration: 0.5,
      type: 'linear',
    },
  },
  exit: {
    opacity: 0,
    zIndex: 1,
    transition: {
      duration: 0.5,
      type: 'linear',
    },
  },
};

interface TAnimatedImage {
  product: Product;
}

export const AnimatedImage: FC<TAnimatedImage> = ({ product }) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleShowOverlay = () => setShowOverlay(true);
  const handleHideOverlay = () => setShowOverlay(false);

  return (
    <AnimatePresence initial={false} mode='sync'>
      <motion.div
        onHoverStart={handleShowOverlay}
        onHoverEnd={handleHideOverlay}
        className={cn('relative h-[400px] shadow-xl')}
      >
        {showOverlay ? (
          <motion.div
            key={`overlay-${product.id}-${product?.images.data?.[0]?.url}`}
            initial='enter'
            animate='visible'
            exit='exit'
            variants={imageVariants}
            className='absolute left-0 top-0 h-full w-full'
          >
            <StrapiImage
              height={800}
              width={800}
              src={product?.images.data?.[1]?.url}
              alt={product?.images.data?.[1]?.alternativeText}
              className='h-full w-full object-cover'
            />
          </motion.div>
        ) : (
          <motion.div
            key={`main-${product.id}-${product?.images.data?.[1]?.url}`}
            initial='enter'
            animate='visible'
            exit='exit'
            variants={imageVariants}
            className='absolute left-0 top-0 h-full w-full'
          >
            <StrapiImage
              height={800}
              width={800}
              src={product?.images.data?.[0]?.url}
              alt={product?.images.data?.[0]?.alternativeText}
              className='h-full w-full object-cover'
            />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
