'use client';

import { motion } from 'framer-motion';
import { MenuItem } from './MenuItem';
import { StrapiLinkType } from '@/types/components';
import { FC } from 'react';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

interface MenuNavProps {
  pages: StrapiLinkType[];
}

export const MenuNav: FC<MenuNavProps> = ({ pages }) => {
  return (
    <motion.ul variants={variants}>
      {pages.map((item: StrapiLinkType) => (
        <MenuItem
          id={item.id}
          key={item.id}
          text={item.text}
          url={item.url}
          isExternal={item.isExternal}
        />
      ))}
    </motion.ul>
  );
};
