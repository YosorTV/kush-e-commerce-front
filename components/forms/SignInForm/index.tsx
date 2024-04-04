'use client';

import { Form, Input } from '@/components/elements';
import { schemas } from '@/lib/zod';
import { authUserAction } from '@/services';
import { SignInProviders, SubmitButton } from '@/components/complex';

export const SignInForm = () => {
  return (
    <Form
      action={authUserAction}
      schema={schemas.login}
      className='flex flex-col gap-y-5'
    >
      <Input
        name='identifier'
        type='email'
        label='Email'
        placeholder='Enter your email address'
        autoComplete='email'
      />
      <Input
        name='password'
        type='password'
        label='Password'
        placeholder='Enter your password'
        autoComplete='password'
      />
      <SubmitButton className='w-full' text='Sign In' loadingText='Loading' />
      <SignInProviders />
    </Form>
  );
};
