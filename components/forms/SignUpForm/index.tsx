'use client';

import { SubmitButton } from '@/components/complex';
import { Form, Input } from '@/components/elements';
import { createUserAction } from '@/services';

export const SignUpForm = () => {
  return (
    <Form
      id='signup-form'
      method='post'
      className='flex w-full flex-col gap-5'
      action={createUserAction}
    >
      <Input
        name='username'
        type='text'
        label='How should we call you?'
        placeholder='Enter your profile name'
        className='border p-2'
        autoComplete='name'
      />
      <Input
        name='email'
        type='email'
        label='What is your email?'
        placeholder='Enter your email address'
        className='border p-2'
        autoComplete='email'
      />
      <Input
        name='password'
        type='password'
        label='Create a password'
        placeholder='Enter your password'
        className='border p-2'
        autoComplete='password'
      />
      <SubmitButton className='w-full' text='Sign Up' loadingText='Loading' />
    </Form>
  );
};
