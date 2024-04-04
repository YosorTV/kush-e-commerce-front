import { FC } from 'react';
import { HeaderProps } from '@/types/components';
import { NextLink as Link } from '@/components/elements';
import { UserSession } from '@/components/complex';

export const Header: FC<HeaderProps> = ({ data, session }) => {
  return (
    <header className='fixed flex min-h-14 w-full items-center bg-slate-200 px-5 '>
      <div className='flex w-full items-center justify-between'>
        <Link href={data?.logoText?.url} className='link text-black'>
          {data?.logoText.text}
        </Link>
        <UserSession
          session={session?.user}
          cta={data?.ctaButton}
          authorized={session?.user}
        />
      </div>
    </header>
  );
};
