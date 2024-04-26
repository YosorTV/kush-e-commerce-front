'use client';

import { signOut } from 'next-auth/react';

export const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button
      type='button'
      onClick={handleSignOut}
      className='font-semibold capitalize hover:bg-none'
    >
      Sign out
    </button>
  );
};
