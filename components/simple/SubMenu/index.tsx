'use client';

import { cormorant } from '@/assets/fonts';
import { Title } from '@/components/elements';
import { cn } from '@/lib';
import { useScreen } from '@/lib/hooks';
import { FC, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CollectionCarousel } from '../CollectionCarousel';
import { MenuItem } from '../Menu/MenuItem';
import { CategoryLinkType } from '@/types/components';
import { usePathname } from '@/lib/navigation';

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

  const pathname = usePathname();

  useEffect(() => {
    return () => onHoverEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
              <Title level='5' className={cn('text-xl uppercase text-base-200', cormorant.className)}>
                {categoryTitle}
              </Title>
            )}
            {categories && categories?.length > 0 && (
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
          {collections && collections.length > 0 && (
            <div className='relative bottom-8 flex w-full justify-between gap-x-6'>
              <CollectionCarousel
                title={collectionTitle}
                titleClass='!text-xl mb-2'
                data={collections}
                slideClass='h-60 p-0'
                className='ml-auto w-10/12'
                fill='fill-base-200'
              />
            </div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
