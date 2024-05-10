import { FC } from 'react';

import { CartIcon } from '@/assets/icons';

import { LangChanger, ThemeChanger } from '@/components/simple';
import { NextLink as Link } from '@/components/elements';
import { UserSession } from '@/components/complex';

import { HeaderProps } from '@/types/components';

export const Header: FC<HeaderProps> = ({ data, session }) => {
  return (
    <header className='fixed z-40 flex min-h-16 w-full items-center bg-base-100 px-5'>
      <nav className='flex w-full items-center justify-between'>
        <Link
          href={data?.logoText?.url}
          className='link font-bold no-underline'
        >
          {data?.logoText.text}
        </Link>
        <div className='flex gap-x-5'>
          <LangChanger />
          <ThemeChanger />
          <CartIcon />
          <UserSession
            locale={session.locale}
            session={session?.user}
            sessionLinks={data?.sessionLinks}
            cta={data?.ctaButton}
            authorized={session?.user}
          />
        </div>
      </nav>
    </header>
  );
};
