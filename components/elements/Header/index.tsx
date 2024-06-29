'use client';

import { FC, useState } from 'react';

import { LangChanger, Menu, SubMenu, ThemeChanger } from '@/components/simple';
import { Logo } from '@/components/elements';
import { Search, UserSession } from '@/components/complex';
import { motion } from 'framer-motion';

import { HeaderProps } from '@/types/components';
import { ShoppingCart } from '@/components/complex/ShoppingCart';
import { useFilters } from '@/store';

export const Header: FC<HeaderProps> = ({ data }) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const state = useFilters();

  const handleShowSubMenu = () =>
    !state.isOpen ? setShowOverlay(true) : setShowOverlay(false);

  const handleHideSubMenu = () => setShowOverlay(false);

  const {
    locale,
    pages,
    sessionLinks,
    session,
    cta,
    shoppingCart,
    categories,
    collections,
    pagesTitle,
    categoryTitle,
    collectionTitle,
    searchTitle,
  } = data;

  const collectionsData = {
    title: collectionTitle,
    data: collections.data ?? [],
  };

  const categoryData = {
    title: categoryTitle,
    data: categories.data ?? [],
  };

  const pagesData = {
    title: pagesTitle,
    data: pages,
  };

  return (
    <motion.header
      onHoverStart={handleShowSubMenu}
      onHoverEnd={handleHideSubMenu}
      className='fixed z-10 flex min-h-16 w-full cursor-pointer items-center bg-base-100 px-5'
    >
      <nav className='flex w-full items-center justify-between'>
        <div className='flex items-center'>
          <Menu
            pages={pagesData}
            collections={collectionsData}
            categories={categoryData}
          />
        </div>
        <div className='flex w-full lg:justify-center'>
          <Logo
            width={160}
            height={48}
            className='relative top-1.5 hidden xs:block'
          />
        </div>
        <div className='flex w-auto items-center gap-x-6'>
          <Search placeholder={searchTitle} />
          <ShoppingCart data={shoppingCart} userId={session?.user?.id} />
          <UserSession
            cta={cta}
            locale={locale}
            session={session?.user}
            sessionLinks={sessionLinks}
          />
          <div className='hidden lg:flex lg:gap-x-6'>
            <LangChanger />
            <ThemeChanger />
          </div>
        </div>
      </nav>
      <SubMenu
        isHovered={showOverlay}
        categoryTitle={categoryTitle}
        collectionTitle={collectionTitle}
        categories={categories.data}
        collections={collections.data}
      />
    </motion.header>
  );
};
