import { Search } from '@/components/complex';
import { ShoppingCart } from '@/components/complex/ShoppingCart';
import { LangChanger, Menu, ThemeChanger } from '@/components/simple';
import { Logo } from '@/components/elements';

import { HeaderProps } from '@/types/components';
import UserSession from '@/components/complex/UserSession';

export default async function Header({ data, shoppingCart, session, locale }: HeaderProps) {
  const {
    pages,
    cta,
    categories,
    collections,
    pagesTitle,
    categoryTitle,
    collectionTitle,
    searchTitle,
    signOutTitle,
    sessionLinks
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
    <header className='fixed z-50 flex min-h-16 w-full cursor-pointer items-center border-b border-info-content bg-base-100 px-5 drop-shadow-md'>
      <nav className='flex w-full items-center justify-between'>
        <div className='flex items-center'>
          <Menu pages={pagesData} collections={collectionsData} categories={categoryData} />
        </div>
        <div className='absolute left-1/2 -translate-x-1/2 transform'>
          <Logo width={160} height={48} className='hidden lg:block' />
        </div>
        <div className='flex items-center gap-x-6'>
          <Search placeholder={searchTitle} />
          <ShoppingCart data={shoppingCart} locale={locale} />
          <UserSession
            cta={cta}
            locale={locale}
            session={session}
            signOutTitle={signOutTitle}
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
}
