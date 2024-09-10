'use client';

import { FC, useEffect } from 'react';

import { cormorant } from '@/assets/fonts';
import { Title } from '@/components/elements';
import { cn } from '@/lib';
import { useScreen } from '@/lib/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { CollectionCarousel } from '../CollectionCarousel';
import { MenuItem } from '../Menu/MenuItem';
import { CategoryLinkType } from '@/types/components';
import { usePathname } from '@/lib/navigation';
import { navAnimations } from '@/assets/animations';

type TSubMenu = {
  categoryTitle: string;
  categories: CategoryLinkType[];
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
  onHoverEnd
}) => {
  const { lg } = useScreen();
  const pathname = usePathname();

  useEffect(() => {
    return () => onHoverEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const printCategory = (category: any) => {
    return (
      <MenuItem
        id={category.id}
        key={category.id}
        text={category.title}
        slug={category.slug}
        url={`/catalog?categories=${category.slug}`}
        isExternal={false}
      />
    );
  };

  return (
    <AnimatePresence mode='wait' initial={false}>
      {isHovered && lg && (
        <motion.nav
          onHoverEnd={onHoverEnd}
          initial='initial'
          animate='animate'
          exit='exit'
          variants={navAnimations}
          className='fixed left-0 top-16 z-0 w-full gap-x-80 bg-base-100 px-5 pt-7'
        >
          <nav className='relative bottom-3.5'>
            {categoryTitle && (
              <Title level='5' className={cn('text-xl uppercase text-base-200', cormorant.className)}>
                {categoryTitle}
              </Title>
            )}
            {categories?.length > 0 && (
              <ul className='flex flex-col gap-y-4 py-1.5 capitalize text-base-200'>{categories.map(printCategory)}</ul>
            )}
          </nav>
          {collections && collections.length > 0 && (
            <div className='relative bottom-8 flex w-full justify-between gap-x-6'>
              <CollectionCarousel
                format='mini'
                title={collectionTitle}
                titleClass='!text-xl mb-2'
                data={collections}
                slideClass='h-60 p-0'
                className='ml-auto w-full'
                fill='fill-base-200'
              />
            </div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
