'use client';

import { FC, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Hamburger, Sidebar } from '@/components/elements';
import { MenuNav } from './MenuNav';

import { useScreen } from '@/lib/hooks';
import { usePathname } from '@/lib/navigation';
import { ListOfPages } from '../ListOfPages';

import { useMenu } from '@/store';
import { StrapiLinkType } from '@/types/components';

type MenuProps = {
  pages: StrapiLinkType[];
};

export const Menu: FC<MenuProps> = ({ pages }) => {
  const menu = useMenu();
  const { lg } = useScreen();
  const pathname = usePathname();

  const handleToggle = () => menu.onToggle();

  useEffect(() => {
    if (pathname) {
      menu.onClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return !lg ? (
    <ListOfPages pages={pages} />
  ) : (
    <motion.div initial={false} animate={menu.isOpen ? 'open' : 'closed'}>
      <Hamburger toggle={handleToggle} />
      <Sidebar opened={menu.isOpen} position='left' onToggle={handleToggle}>
        <MenuNav pages={pages} />
      </Sidebar>
    </motion.div>
  );
};
