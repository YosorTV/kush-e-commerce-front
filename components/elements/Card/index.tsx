'use client';

import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdArrowRightAlt } from 'react-icons/md';

import { StrapiImage } from '@/components/simple';
import { Title, NextLink } from '@/components/elements';
import { formatPrice } from '@/helpers/formatters';
import { cn } from '@/lib';

export const Card: FC<any> = ({ data }) => {
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
              href={`/catalog/${data.title}?id=${data.id}&code=${data.code}`}
              className='z-20 flex items-center gap-x-2.5 bg-white p-2.5 font-semibold'
            >
              <MdArrowRightAlt className='h-6 w-6' /> Explore now
            </NextLink>
          </motion.div>
        )}
      </AnimatePresence>
      <StrapiImage
        src={data?.cover?.url}
        alt={data?.cover?.alternativeText}
        height={1540}
        width={1100}
        className='h-[500px] w-full object-cover lg:h-[700px]'
      />
      <div className='card-body absolute bottom-0 z-10 p-5 pt-0 text-white'>
        <Title level='2' className='card-title'>
          {data?.title}
        </Title>
        <p>{data?.description}</p>
        <p>
          {data?.price} <span>{formatPrice(data.unitAmount)}</span>
        </p>
      </div>
    </motion.figure>
  );
};
