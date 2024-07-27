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

  const getImage = ({ idx = 0 }: { idx: number }) => {
    return (
      product?.images &&
      product?.images.data.length > 0 &&
      product?.images.data?.[idx]
    );
  };

  const img1 = getImage({ idx: 0 });
  const img2 = getImage({ idx: 1 });

  return (
    <AnimatePresence initial={false} mode='sync'>
      <motion.div
        onHoverStart={handleShowOverlay}
        onHoverEnd={handleHideOverlay}
        className={cn('relative h-[400px] shadow-xl')}
      >
        {showOverlay ? (
          <motion.div
            key={`overlay-${product.id}-${img1.url}`}
            initial='enter'
            animate='visible'
            exit='exit'
            variants={imageVariants}
            className='absolute left-0 top-0 h-full w-full'
          >
            <StrapiImage
              loading='lazy'
              height={img2.formats.medium.height}
              width={img2.formats.medium.width}
              src={img2?.url}
              alt={img2?.alternativeText}
              formats={img2.formats}
              className='h-full w-full object-cover'
            />
          </motion.div>
        ) : (
          <motion.div
            key={`main-${product.id}-${img2.url}`}
            initial='enter'
            animate='visible'
            exit='exit'
            variants={imageVariants}
            className='absolute left-0 top-0 h-full w-full'
          >
            <StrapiImage
              loading='lazy'
              formats={img1.formats}
              height={img1.formats.medium.height}
              width={img1.formats.medium.width}
              src={img1?.url}
              alt={img1?.alternativeText}
              className='h-full w-full object-cover'
            />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
