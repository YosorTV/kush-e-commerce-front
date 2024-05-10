'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { ROOT } from '@/helpers/constants';

export const SignOutButton: FC<{ text: string }> = ({ text }) => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: ROOT });
  };

  return (
    <button
      type='button'
      onClick={handleSignOut}
      className='font-semibold capitalize hover:bg-none'
    >
      {text}
    </button>
  );
};
