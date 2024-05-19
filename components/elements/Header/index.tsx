import { FC } from 'react';

import { LangChanger, ListOfPages, ThemeChanger } from '@/components/simple';
import { Logo } from '@/components/elements';
import { UserSession } from '@/components/complex';

import { HeaderProps } from '@/types/components';
import { ShoppingCart } from '@/components/complex/ShoppingCart';

export const Header: FC<HeaderProps> = ({ data }) => {
  const { locale, pages, sessionLinks, session, cta, shoppingCart } = data;

  return (
    <header className='fixed z-40 flex min-h-16 w-full items-center bg-base-100 px-5'>
      <nav className='relative flex w-full items-center justify-between'>
        <ListOfPages pages={pages} />
        <Logo />
        <div className='flex items-center gap-x-6'>
          <UserSession
            cta={cta}
            locale={locale}
            session={session?.user}
            sessionLinks={sessionLinks}
          />
          <LangChanger />
          <ShoppingCart data={shoppingCart} userId={session?.user?.id} />
          <ThemeChanger />
        </div>
      </nav>
    </header>
  );
};
