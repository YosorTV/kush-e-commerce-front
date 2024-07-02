'use client';

import { forgotPassword } from '@/services';

import { cn } from '@/lib';
import { schemas } from '@/lib/zod';

import { SubmitButton } from '@/components/simple';
import { Form, Input, NextLink, Title } from '@/components/elements';

import { cormorant } from '@/assets/fonts';

export const ForgotForm = ({ data, locale }: any) => {
  const schema = schemas['forgot-password'](locale);

  const printInputs = (inputs: any) => {
    return inputs?.map((input: any) => <Input key={input.id} {...input} />);
  };

  return (
    <Form
      action={forgotPassword}
      schema={schema}
      className='auth-page_form !gap-y-5'
    >
      <Title level='1' className={cn(cormorant.className, 'auth-form_title')}>
        {data.title}
      </Title>
      <div className='flex flex-col pb-5'>
        <Input
          id='locale'
          name='locale'
          type='text'
          value={data.locale}
          hidden
          readOnly
        />
        {printInputs(data.formFields)}
      </div>
      <SubmitButton
        text={data.submitBtn.text}
        loadingText={data.submitBtn.loadingText}
        className='auth-form_submit'
      />
      <div className='divider m-0 w-full px-5' />
      <NextLink
        className='auth-link'
        href={data.loginUrl.url}
        replace={data.loginUrl.isExternal}
      >
        {data.loginUrl.text}
      </NextLink>
    </Form>
  );
};
