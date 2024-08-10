'use client';

import { FC, useState } from 'react';
import { IoNavigateCircleSharp } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib';

import { StrapiImage } from '@/components/simple';
import { NextLink, Title } from '@/components/elements';
import { IImageFormats } from '@/types/components';

type TCollectioCard = {
  title: string;
  hintText?: string;
  slug: string;
  className?: string;
  textClassName?: string;
  img: {
    alternativeText?: string;
    url: string;
    formats: IImageFormats;
  };
};

export const CollectionCard: FC<TCollectioCard> = ({ img, className, title, hintText = 'Explore now', slug }) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleShowOverlay = () => setShowOverlay(true);
  const handleHideOverlay = () => setShowOverlay(false);

  return (
    <motion.figure
      className={cn(className, 'embla__slide relative cursor-grab active:cursor-grabbing')}
      onHoverStart={handleShowOverlay}
      onHoverEnd={handleHideOverlay}
    >
      <NextLink
        href={`/collection/${slug}`}
        className='z-20 flex flex-col items-center gap-x-2.5 font-semibold text-base-300'
      >
        <AnimatePresence mode='sync'>
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 z-10 flex items-center justify-center border-2 border-white'
            >
              <IoNavigateCircleSharp className='mr-2.5 h-6 w-6 fill-base-300' />
              {hintText}
            </motion.div>
          )}
        </AnimatePresence>
        <StrapiImage
          overlay
          src={img.url}
          alt={img?.alternativeText}
          formats={img.formats}
          height={img.formats.medium.height}
          width={img.formats.medium.width}
          loading='lazy'
          className='aspect-square h-full w-full object-cover'
        />
        <Title level='4' variant='subheading' className='absolute bottom-3 !text-2xl !text-white lg:bottom-1'>
          {title}
        </Title>
      </NextLink>
    </motion.figure>
  );
};
