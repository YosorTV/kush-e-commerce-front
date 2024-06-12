import { FC } from 'react';

import { LangChanger, Menu, ThemeChanger } from '@/components/simple';
import { Logo } from '@/components/elements';
import { Search, UserSession } from '@/components/complex';

import { HeaderProps } from '@/types/components';
import { ShoppingCart } from '@/components/complex/ShoppingCart';

export const Header: FC<HeaderProps> = ({ data }) => {
  const { locale, pages, sessionLinks, session, cta, shoppingCart } = data;

  return (
    <header className='fixed z-10 flex min-h-16 w-full items-center bg-base-100 px-5'>
      <nav className=' flex w-full items-center justify-between'>
        <Menu pages={pages} />
        <Logo width={150} height={42} />
        <div className='flex items-center gap-x-6'>
          <Search data={{}} />
          <UserSession
            cta={cta}
            locale={locale}
            session={session?.user}
            sessionLinks={sessionLinks}
          />
          <ShoppingCart data={shoppingCart} userId={session?.user?.id} />
          <div className='hidden lg:flex lg:gap-x-6'>
            <LangChanger />
            <ThemeChanger />
          </div>
        </div>
      </nav>
    </header>
  );
};
