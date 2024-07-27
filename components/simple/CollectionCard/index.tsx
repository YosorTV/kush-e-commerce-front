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

export const CollectionCard: FC<TCollectioCard> = ({
  img,
  className,
  textClassName = 'text-base-200',
  title,
  hintText = 'Explore now',
  slug,
}) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleShowOverlay = () => setShowOverlay(true);
  const handleHideOverlay = () => setShowOverlay(false);

  return (
    <motion.figure
      className={cn(className, 'relative')}
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
              className='z-20 flex items-center gap-x-2.5 p-5 font-semibold text-base-200'
            >
              <IoNavigateCircleSharp
                style={{
                  fill: 'white',
                  width: 24,
                  height: 24,
                }}
              />
              {hintText}
            </NextLink>
          </motion.div>
        )}
      </AnimatePresence>
      <StrapiImage
        alt={img.alternativeText}
        src={img.url}
        formats={img.formats}
        height={img.formats.medium.height}
        width={img.formats.medium.width}
        loading='lazy'
        className='h-full w-full object-cover object-center-to-top'
      />
      <Title level='5' className={cn('text-xl font-medium', textClassName)}>
        {title}
      </Title>
    </motion.figure>
  );
};
