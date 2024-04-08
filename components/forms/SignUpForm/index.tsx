'use client';

import { FC } from 'react';
import { SubmitButton } from '@/components/complex';
import { Form, Input } from '@/components/elements';
import { createUserAction } from '@/services';

export const SignUpForm: FC<{ formFields: any[]; cta: any }> = ({
  formFields,
  cta,
}) => {
  const printInputs = (data: any) => {
    return data?.map((input: any) => <Input key={input.id} {...input} />);
  };

  return (
    <Form
      id='signup-form'
      method='post'
      className='flex w-full flex-col gap-5'
      action={createUserAction}
    >
      {printInputs(formFields)}
      <SubmitButton
        text={cta.text}
        loadingText={cta.loadingText}
        className='w-full'
      />
    </Form>
  );
};
