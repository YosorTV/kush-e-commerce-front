'use client';

import { Form, Input } from '@/components/elements';
import { schemas } from '@/lib/zod';
import { forgotPassword } from '@/services';
import { SubmitButton } from '@/components/complex';

export const ForgotForm = ({ formFields, submitBtn }: any) => {
  const printInputs = (inputs: any) => {
    return inputs?.map((input: any) => <Input key={input.id} {...input} />);
  };

  return (
    <Form
      action={forgotPassword}
      schema={schemas.login}
      className='flex w-1/4 flex-col gap-y-5'
    >
      {printInputs(formFields)}
      <SubmitButton
        className='w-full'
        text={submitBtn.text}
        loadingText={submitBtn.loadingText}
      />
    </Form>
  );
};
