'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';

export const SignOutButton: FC<{ text: string }> = ({ text }) => {
  const handleSignOut = async () => {
    await signOut();
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
