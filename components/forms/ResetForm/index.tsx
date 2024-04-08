'use client';

import { Form, Input } from '@/components/elements';
import { schemas } from '@/lib/zod';
import { resetPassword } from '@/services';
import { SubmitButton } from '@/components/complex';

export const ResetForm = ({ formFields, submitBtn, code }: any) => {
  const printInputs = (inputs: any) => {
    return inputs?.map((input: any) => <Input key={input.id} {...input} />);
  };

  return (
    <Form
      action={resetPassword}
      schema={schemas['reset-password']}
      className='flex w-1/4 flex-col gap-y-5'
    >
      <Input type='hidden' name='code' value={code} />
      {printInputs(formFields)}
      <SubmitButton
        className='w-full'
        text={submitBtn?.text}
        loadingText={submitBtn?.loadingText}
      />
    </Form>
  );
};
