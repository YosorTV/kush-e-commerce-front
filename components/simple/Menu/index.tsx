'use client';

import { FC, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Hamburger, Sidebar } from '@/components/elements';
import { MenuNav } from './MenuNav';

import { usePathname } from '@/lib/navigation';
import { ListOfPages } from '../ListOfPages';

import { useMenu } from '@/store';
import { StrapiLinkType } from '@/types/components';
import { useSearchParams } from 'next/navigation';

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
  const params = useSearchParams();

  const category = params.get('category');

  const handleToggle = () => menu.onToggle();

  useEffect(() => {
    return () => {
      menu.onClose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, category]);

  return (
    <>
      <ListOfPages
        pages={pages.data}
        categories={categories}
        collections={collections}
        className='hidden lg:flex'
      />
      <motion.div
        initial={false}
        animate={menu.isOpen ? 'open' : 'closed'}
        className='w-full lg:hidden'
      >
        <Hamburger toggle={handleToggle} />
        <Sidebar opened={menu.isOpen} position='left' onToggle={handleToggle}>
          <MenuNav
            pages={pages}
            categories={categories}
            collections={collections}
          />
        </Sidebar>
      </motion.div>
    </>
  );
};
