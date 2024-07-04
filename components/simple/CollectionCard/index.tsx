'use client';

import { FC, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { StrapiImage } from '../StrapiImage';
import { NextLink, Title } from '@/components/elements';
import { IoNavigateCircleSharp } from 'react-icons/io5';
import { cn } from '@/lib';

type TCollectioCard = {
  title: string;
  slug: string;
  className?: string;
  img: {
    alternativeText?: string;
    url: string;
  };
};

export const CollectionCard: FC<TCollectioCard> = ({
  img,
  className,
  title,
  slug,
}) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleShowOverlay = () => setShowOverlay(true);
  const handleHideOverlay = () => setShowOverlay(false);

  return (
    <motion.figure
      className={cn(className, 'relative mx-4 my-2')}
      onHoverStart={handleShowOverlay}
      onHoverEnd={handleHideOverlay}
    >
      <AnimatePresence mode='sync'>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 z-10 flex items-center justify-center'
          >
            <div className='pointer-events-none absolute h-full w-full bg-black/50' />
            <NextLink
              href={`/collection/${slug}`}
              className='z-20 flex items-center p-2.5 font-semibold'
            >
              <IoNavigateCircleSharp
                style={{
                  fill: 'white',
                  width: 24,
                  height: 24,
                }}
              />
            </NextLink>
          </motion.div>
        )}
      </AnimatePresence>
      <StrapiImage
        alt={img.alternativeText}
        src={img.url}
        height={500}
        width={500}
        className='h-full w-full object-cover object-bottom'
      />
      <Title level='5' className='text-xl font-medium text-base-200'>
        {title}
      </Title>
    </motion.figure>
  );
};
