'use client';

import { Form, Input } from '@/components/elements';
import { SubmitButton } from '@/components/simple';
import { schemas } from '@/lib';

export const ProfileForm = ({ data, state }: any) => {
  const printInputs = (data: any) => {
    return data?.map((input: any) => <Input key={input.id} {...input} />);
  };

  return (
    <Form
      action={null}
      schema={schemas.profile}
      className='flex flex-col gap-y-5'
    >
      {printInputs(data?.formFields)}
      <SubmitButton
        className='w-full'
        text={data?.submitBtn?.text ?? 'Apply'}
        loadingText={data?.submitBtn?.loadingText ?? 'Loading...'}
      />
    </Form>
  );
};
