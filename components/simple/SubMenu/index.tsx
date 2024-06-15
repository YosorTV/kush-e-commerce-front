'use client';

import { cormorant } from '@/assets/fonts';
import { NextLink, Title } from '@/components/elements';
import { cn } from '@/lib';
import { useScreen } from '@/lib/hooks';
import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CollectionCarousel } from '../CollectionCarousel';

type TSubMenu = {
  categoryTitle: string;
  categories: any[];
  collectionTitle?: string;
  collections?: any[];
  isHovered: boolean;
};

export const SubMenu: FC<TSubMenu> = ({
  categoryTitle,
  categories,
  collections,
  collectionTitle,
  isHovered,
}) => {
  const { lg } = useScreen();

  return (
    <AnimatePresence mode='popLayout'>
      {isHovered && lg && (
        <motion.nav
          layout
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.3,
          }}
          initial={{
            display: 'none',
            opacity: 0,
          }}
          animate={{
            display: 'flex',
            opacity: 1,
          }}
          exit={{
            display: 'none',
            opacity: 0,
          }}
          className='absolute left-0 top-16 z-0 w-full gap-x-16 bg-base-100 px-5 pt-7'
        >
          <div>
            <Title
              level='5'
              className={cn(
                'text-xl uppercase text-base-200',
                cormorant.className
              )}
            >
              {categoryTitle}
            </Title>
            <ul className='flex flex-col gap-y-4 py-4 capitalize text-base-200'>
              {categories.map((category) => (
                <li key={category.id}>
                  <NextLink href={`/catalog?category=${category.title}`}>
                    {category.title}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
          {collections.length > 0 && (
            <div className='flex w-full justify-between gap-x-6'>
              <div>
                <Title
                  level='5'
                  className={cn(
                    'text-xl uppercase text-base-200',
                    cormorant.className
                  )}
                >
                  {collectionTitle}
                </Title>
                <ul className='flex flex-col gap-y-4 py-4 uppercase text-base-200'>
                  {collections.map((collection) => (
                    <li key={collection.id}>
                      <span>{collection.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <CollectionCarousel
                  data={collections}
                  options={{ slidesToScroll: 'auto', loop: true }}
                />
              </div>
            </div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
