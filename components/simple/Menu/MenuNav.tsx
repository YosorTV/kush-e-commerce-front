'use client';

import { motion } from 'framer-motion';
import { MenuItem } from './MenuItem';
import {
  CategoryLinkType,
  CollectionLinkType,
  StrapiLinkType,
} from '@/types/components';
import { FC } from 'react';
import { Title } from '@/components/elements';
import { cormorant } from '@/assets/fonts';
import { cn } from '@/lib';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

type MenuNavProps = {
  pages: {
    title: string;
    data: StrapiLinkType[];
  };
  collections: {
    title: string;
    data: any[];
  };
  categories: {
    title: string;
    data: any[];
  };
};

export const MenuNav: FC<MenuNavProps> = ({
  pages,
  categories,
  collections,
}) => {
  return (
    <motion.div variants={variants}>
      <div>
        <Title
          level='5'
          className={cn(cormorant.className, 'text-2xl capitalize')}
        >
          {pages.title}
        </Title>
        <motion.ul>
          {pages.data.map((item: StrapiLinkType) => (
            <MenuItem
              id={item.id}
              key={item.id}
              text={item.text}
              url={item.url}
              isExternal={item.isExternal}
            />
          ))}
        </motion.ul>
      </div>
      <div className='divider' />
      <div>
        <Title
          level='5'
          className={cn(cormorant.className, 'text-2xl capitalize')}
        >
          {categories.title}
        </Title>
        <motion.ul>
          {categories.data.map((item: CategoryLinkType) => (
            <MenuItem
              id={item.id}
              key={item.id}
              text={item.title}
              url={`/catalog?category=${item.slug}`}
              isExternal={false}
            />
          ))}
        </motion.ul>
      </div>
      <div className='divider' />
      <div>
        <Title
          level='5'
          className={cn(cormorant.className, 'text-2xl capitalize')}
        >
          {collections.title}
        </Title>
        <motion.ul>
          {collections.data.map((item: CollectionLinkType) => (
            <MenuItem
              id={item.id}
              key={item.id}
              text={item.title}
              url={`/collection/${item.slug}`}
              isExternal={false}
            />
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};
