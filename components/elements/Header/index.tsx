import { FC } from 'react';
import { HeaderProps } from '@/types/components';
import { NextLink as Link } from '@/components/elements';

export const Header: FC<HeaderProps> = (props) => {
  return (
    <header className='fixed flex min-h-14 w-full items-center bg-slate-200 px-5 '>
      <div className='flex w-full items-center justify-between'>
        <Link href={props.logoText?.url} className='link text-black'>
          {props.logoText.text}
        </Link>
        <Link
          href={props.ctaButton?.url}
          className='btn btn-ghost uppercase text-black'
        >
          {props.ctaButton.text}
        </Link>
      </div>
    </header>
  );
};
