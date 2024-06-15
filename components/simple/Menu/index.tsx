'use client';

import { FC, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Hamburger, Sidebar } from '@/components/elements';
import { MenuNav } from './MenuNav';

import { useScreen, useScrollLock } from '@/lib/hooks';
import { usePathname } from '@/lib/navigation';
import { ListOfPages } from '../ListOfPages';

import { useMenu } from '@/store';
import { StrapiLinkType } from '@/types/components';

type MenuProps = {
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

export const Menu: FC<MenuProps> = ({ pages, categories, collections }) => {
  const menu = useMenu();
  const pathname = usePathname();
  const { lg } = useScreen();

  const handleToggle = () => menu.onToggle();

  useScrollLock(menu.isOpen);

  useEffect(() => {
    return () => {
      menu.onClose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return lg ? (
    <ListOfPages pages={pages.data} />
  ) : (
    <motion.div initial={false} animate={menu.isOpen ? 'open' : 'closed'}>
      <Hamburger toggle={handleToggle} />
      <Sidebar opened={menu.isOpen} position='left' onToggle={handleToggle}>
        <MenuNav
          pages={pages}
          categories={categories}
          collections={collections}
        />
      </Sidebar>
    </motion.div>
  );
};
