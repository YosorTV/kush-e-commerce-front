'use client';

import { Form, Input, Title } from '@/components/elements';
import { schemas } from '@/lib/zod';
import { resetPassword } from '@/services';
import { SubmitButton } from '@/components/simple';
import { cormorant } from '@/assets/fonts';
import { cn } from '@/lib';

export const ResetForm = ({ data, code, locale }: any) => {
  const schema = schemas['reset-password'](locale);

  const printInputs = (inputs: any) => {
    return inputs?.map((input: any) => <Input key={input.id} {...input} />);
  };

  return (
    <Form
      action={resetPassword}
      schema={schema}
      className='auth-page_form !gap-y-5'
    >
      <Title level='1' className={cn(cormorant.className, 'auth-form_title')}>
        {data.title}
      </Title>
      <div className='flex flex-col gap-y-10 py-2.5'>
        <Input
          type='hidden'
          name='locale'
          containerClass='hidden'
          value={locale}
        />
        <Input type='hidden' name='code' containerClass='hidden' value={code} />
        {printInputs(data.formFields)}
      </div>
      <div className='divider !m-0 w-full px-5' />
      <SubmitButton
        className='auth-form_submit !mt-2.5'
        text={data.submitBtn?.text}
        loadingText={data.submitBtn?.loadingText}
      />
    </Form>
  );
};
