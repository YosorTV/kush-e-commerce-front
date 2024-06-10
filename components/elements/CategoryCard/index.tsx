'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

import { MdArrowRightAlt } from 'react-icons/md';

import { StrapiImage } from '@/components/simple';
import { Title, NextLink } from '@/components/elements';
import { cn } from '@/lib';
import { formatPrice } from '@/helpers/formatters';

export const CategoryCard: FC<any> = ({ data }) => {
  const t = useTranslations();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleShowOverlay = () => setShowOverlay(true);
  const handleHideOverlay = () => setShowOverlay(false);

  return (
    <motion.figure
      onHoverStart={handleShowOverlay}
      onHoverEnd={handleHideOverlay}
      className={cn(
        'card relative mx-2.5 w-[350px] overflow-hidden rounded-none border-2 border-transparent lg:w-[550px]',
        showOverlay && 'border-white'
      )}
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
              href={`/catalog/${data.id}`}
              className='z-20 flex items-center gap-x-2.5 bg-white p-2.5 font-semibold text-black'
            >
              <MdArrowRightAlt className='h-6 w-6' /> {t('system.explore')}
            </NextLink>
          </motion.div>
        )}
      </AnimatePresence>
      <StrapiImage
        src={data?.images.data[0]?.url}
        alt={data?.images.data[0]?.alternativeText}
        height={1540}
        width={1100}
        className='h-[500px] w-full object-cover lg:h-[700px]'
      />
      <div className='card-body absolute bottom-0 z-10 p-5 pt-0'>
        <span className='text-secondary'>{data.hintText}</span>
        <div className='flex flex-1 justify-between pt-2'>
          <Title
            level='3'
            className='text-lg font-semibold uppercase text-white'
          >
            {data.title}
          </Title>
        </div>
        <div className='flex flex-col pt-2'>
          <p className='text-base font-medium text-white'>{data.description}</p>
          <div className='flex w-full items-center justify-between'>
            <span className='text-base text-white'>
              {formatPrice(Number(data.price))}
            </span>
          </div>
        </div>
      </div>
    </motion.figure>
  );
};
