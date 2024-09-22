'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';

import { cn } from '@/lib';

interface ISignOut {
  text: string;
  icon?: JSX.Element;
  className?: string;
}

export const SignOutButton: FC<ISignOut> = ({ text, icon, className }) => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <button type='button' onClick={handleSignOut} className={cn('font-semibold capitalize hover:bg-none', className)}>
      <span className='flex items-center'>
        {icon && <span className='mr-2'>{icon}</span>}
        {text}
      </span>
    </button>
  );
};
