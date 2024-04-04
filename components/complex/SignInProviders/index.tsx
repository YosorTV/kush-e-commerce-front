'use client';

import { signIn } from 'next-auth/react';

export const SignInProviders = () => {
  const handleGoogle = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <button
        type='button'
        className='btn btn-ghost w-full'
        onClick={handleGoogle}
      >
        Continue with Google
      </button>
    </div>
  );
};
