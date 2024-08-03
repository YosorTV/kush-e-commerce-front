'use client';

import { FC, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

import { MdArrowRightAlt } from 'react-icons/md';

import { Hydrate, StrapiImage } from '@/components/simple';
import { Title, NextLink } from '@/components/elements';
import { cn } from '@/lib';
import { Price } from '@/components/simple/Price';
import { useProducts } from '@/store';

export const CategoryCard: FC<any> = ({ data }) => {
  const locale = useLocale();

  const t = useTranslations();
  const state = useProducts();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleShowOverlay = () => setShowOverlay(true);
  const handleHideOverlay = () => setShowOverlay(false);

  return (
    <motion.figure
      onHoverStart={handleShowOverlay}
      onHoverEnd={handleHideOverlay}
      className={cn(
        'card relative w-full overflow-hidden rounded-none border-2 border-transparent',
        showOverlay && 'border-white'
      )}
    >
      <NextLink
        href={`/catalog/${data.slug}`}
        className='z-20 flex items-center gap-x-2.5 bg-white p-2.5 font-semibold text-black'
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
              <span className='z-10 flex bg-white p-1.5 text-black'>
                <MdArrowRightAlt className='h-6 w-6' /> {t('system.explore')}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className='h-[420px] w-full lg:h-[512px]'>
          <StrapiImage
            fill
            formats={data?.images?.data?.[0]?.formats}
            src={data?.images?.data?.[0]?.url}
            alt={data?.images?.data?.[0]?.alternativeText}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='group absolute bottom-0 left-0 z-10 w-full bg-black/50 p-5'>
          <div className='flex flex-1 justify-between pt-2'>
            <Title
              level='3'
              className='text-lg font-medium uppercase text-white'
            >
              {data.title}
            </Title>
          </div>
          <div className='flex flex-col'>
            <p
              className={cn(
                'line-clamp-1 w-1/2 text-base font-medium text-white transition-all duration-300',
                showOverlay && 'w-full'
              )}
            >
              {data.description}
            </p>
            <div className='flex w-full items-center justify-between'>
              <Hydrate>
                <Price
                  className='!flex-row font-medium text-base-300'
                  locale={locale}
                  price={data?.price}
                  sale={data?.sale}
                  currency={state.currency}
                />
              </Hydrate>
            </div>
          </div>
        </div>
      </NextLink>
    </motion.figure>
  );
};
