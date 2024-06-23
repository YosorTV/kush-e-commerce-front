'use client';

import { FC } from 'react';
import { SubmitButton } from '@/components/simple';
import { Form, Input, Title } from '@/components/elements';
import { createUserAction } from '@/services';
import { cn, schemas } from '@/lib';
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
    return data?.map((input: any) => (
      <Input key={input.id} containerClass='pb-2 md:pb-4' {...input} />
    ));
  };

  return (
    <Form
      method='post'
      id='signup-form'
      schema={schema}
      action={createUserAction}
      className={cn(
        className,
        'flex flex-col items-center justify-center bg-base-100'
      )}
    >
      <div className='w-full'>
        <Title
          level='1'
          className={cn(cormorant.className, 'text-5xl text-base-200')}
        >
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
        <SubmitButton
          text={cta.text}
          loadingText={cta.loadingText}
          className='w-full !rounded-md !bg-base-200 !text-base-100'
        />
      </div>
    </Form>
  );
};
