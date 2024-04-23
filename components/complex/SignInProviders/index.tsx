'use client';

import { signIn } from 'next-auth/react';
import { FC } from 'react';

export const SignInProviders: FC<{ text: string; identifier: string }> = ({
  text,
  identifier,
}) => {
  const handleGoogle = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  const actionProvider: any = {
    google: handleGoogle,
  };

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <button
        type='button'
        className='btn btn-ghost w-full'
        onClick={actionProvider[identifier]}
      >
        {text}
      </button>
    </div>
  );
};
