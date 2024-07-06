'use client';

import { cormorant } from '@/assets/fonts';
import { Title } from '@/components/elements';
import { cn } from '@/lib';
import { useScreen } from '@/lib/hooks';
import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CollectionCarousel } from '../CollectionCarousel';
import { MenuItem } from '../Menu/MenuItem';
import { CategoryLinkType, CollectionLinkType } from '@/types/components';

type TSubMenu = {
  categoryTitle: string;
  categories: any[];
  collectionTitle?: string;
  collections?: any[];
  onHoverEnd: () => void;
  isHovered: boolean;
};

export const SubMenu: FC<TSubMenu> = ({
  categoryTitle,
  categories,
  collections,
  collectionTitle,
  isHovered,
  onHoverEnd,
}) => {
  const { lg } = useScreen();

  return (
    <AnimatePresence mode='popLayout'>
      {isHovered && lg && (
        <motion.nav
          onHoverEnd={onHoverEnd}
          transition={{
            type: 'tween',
            ease: 'easeOut',
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
          className='fixed left-0 top-16 z-0 w-full gap-x-16 bg-base-100 px-5 pt-7'
        >
          <div>
            {categoryTitle && (
              <Title
                level='5'
                className={cn(
                  'text-xl uppercase text-base-200',
                  cormorant.className
                )}
              >
                {categoryTitle}
              </Title>
            )}
            {categories.length > 0 && (
              <ul className='flex flex-col gap-y-4 py-4 capitalize text-base-200'>
                {categories.map((category: CategoryLinkType) => (
                  <MenuItem
                    id={category.id}
                    key={category.id}
                    text={category.title}
                    slug={category.slug}
                    url={`/catalog?category=${category.slug}`}
                    isExternal={false}
                  />
                ))}
              </ul>
            )}
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
                  {collections.map((item: CollectionLinkType) => (
                    <MenuItem
                      id={item.id}
                      key={item.id}
                      text={item.title}
                      url={`/collection/${item.slug}`}
                      isExternal={false}
                    />
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
