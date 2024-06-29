'use client';

import { FC } from 'react';

import { cn, schemas } from '@/lib';
import { createUserAction } from '@/services';

import { SubmitButton } from '@/components/simple';
import { Form, Input, Title } from '@/components/elements';

import { cormorant } from '@/assets/fonts';

interface ISignUpForm {
  formFields: any[];
  title: string;
  className?: string;
  cta: any;
  locale: string;
}

export const SignUpForm: FC<ISignUpForm> = ({
  title,
  formFields,
  className,
  locale,
  cta,
}) => {
  const schema = schemas.signup(locale);

  const printInputs = (data: any) => {
    return data?.map((input: any) => {
      return (
        <Input
          key={input.id}
          containerClass='pb-2 md:pb-4 md:last:col-span-2'
          {...input}
        />
      );
    });
  };

  return (
    <Form
      method='post'
      id='signup-form'
      schema={schema}
      action={createUserAction}
      className={cn(className, 'auth-page_form')}
    >
      <div className='w-full'>
        <Title level='1' className={cn(cormorant.className, 'auth-form_title')}>
          {title}
        </Title>
        <Input
          id='locale'
          name='locale'
          type='text'
          value={locale}
          hidden
          readOnly
        />
        <div className='grid grid-cols-1 gap-x-10 gap-y-2.5 py-5 md:grid-cols-2'>
          {printInputs(formFields)}
        </div>
        <div className='divider m-0 mb-5 w-full px-5' />
        <SubmitButton
          text={cta.text}
          loadingText={cta.loadingText}
          className='auth-form_submit'
        />
      </div>
    </Form>
  );
};
