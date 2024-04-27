import { FC } from 'react';
import { HeaderProps } from '@/types/components';
import { NextLink as Link } from '@/components/elements';
import { UserSession } from '@/components/complex';
import { CartIcon } from '@/assets/icons';
import { ThemeChanger } from '@/components/simple';

export const Header: FC<HeaderProps> = ({ data, session }) => {
  return (
    <header className='fixed z-50 flex min-h-14 w-full items-center bg-base-100 px-5'>
      <nav className='flex w-full items-center justify-between'>
        <Link
          href={data?.logoText?.url}
          className='link font-bold no-underline'
        >
          {data?.logoText.text}
        </Link>
        <div className='flex gap-x-5'>
          <ThemeChanger />
          <CartIcon />
          <UserSession
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
