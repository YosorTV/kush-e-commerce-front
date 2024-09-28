'use client';

import { FC } from 'react';

import { cn } from '@/lib';
import { useLocale } from 'next-intl';
import { logout } from '@/services';

interface ISignOut {
  text: string;
  icon?: JSX.Element;
  className?: string;
}

export const SignOutButton: FC<ISignOut> = ({ text, icon, className }) => {
  const locale = useLocale();

  const handleSignOut = async () => await logout({ locale });

  return (
    <button
      type='button'
      onClick={handleSignOut}
      className={cn('font-semibold capitalize underline-offset-8 hover:bg-none', className)}
    >
      <span className='flex items-center'>
        {icon && <span className='mr-2'>{icon}</span>}
        {text}
      </span>
    </button>
  );
};
