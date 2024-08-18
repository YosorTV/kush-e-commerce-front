import { FC } from 'react';

import { LangChanger, Menu, ThemeChanger } from '@/components/simple';
import { Logo } from '@/components/elements';
import { Search, UserSession } from '@/components/complex';

import { HeaderProps } from '@/types/components';
import { ShoppingCart } from '@/components/complex/ShoppingCart';

export const Header: FC<HeaderProps> = ({ data, locale }) => {
  const {
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
    signOutTitle
  } = data;

  const collectionsData = {
    title: collectionTitle,
    data: collections.data ?? []
  };

  const categoryData = {
    title: categoryTitle,
    data: categories.data ?? []
  };

  const pagesData = {
    title: pagesTitle,
    data: pages
  };

  return (
    <header className='fixed z-20 flex min-h-16 w-full cursor-pointer items-center bg-base-100 px-5 drop-shadow-md'>
      <nav className='flex w-full items-center justify-between'>
        <div className='flex items-center'>
          <Menu pages={pagesData} collections={collectionsData} categories={categoryData} />
        </div>
        <div className='flex w-full lg:justify-center'>
          <Logo width={160} height={48} className='!lg:absolute-center hidden xs:left-36 xs:block' />
        </div>
        <div className='flex items-center gap-x-6'>
          <Search placeholder={searchTitle} />
          <ShoppingCart data={shoppingCart} userId={session?.user?.id} />
          <UserSession
            cta={cta}
            locale={locale}
            signOutTitle={signOutTitle}
            session={session?.user}
            sessionLinks={sessionLinks}
          />
          <div className='hidden lg:flex lg:gap-x-6'>
            <LangChanger />
            <ThemeChanger />
          </div>
        </div>
      </nav>
    </header>
  );
};
