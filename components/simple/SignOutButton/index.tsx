'use client';

import { FC } from 'react';

import { cn } from '@/lib';
import { signOut } from 'next-auth/react';
import { ROOT } from '@/helpers/constants';
import { useLocale } from 'next-intl';

interface ISignOut {
  text: string;
  icon?: JSX.Element;
  className?: string;
}

export const SignOutButton: FC<ISignOut> = ({ text, icon, className }) => {
  const locale = useLocale();

  return (
    <button
      type='button'
      onClick={() => signOut({ redirect: true, callbackUrl: `${ROOT}${locale}` })}
      className={cn('font-semibold capitalize underline-offset-8 hover:bg-none', className)}
    >
      <span className='flex items-center'>
        {icon && <span className='mr-2'>{icon}</span>}
        {text}
      </span>
    </button>
  );
};
