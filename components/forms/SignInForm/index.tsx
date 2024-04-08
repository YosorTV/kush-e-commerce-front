'use client';

import { Form, Input } from '@/components/elements';
import { schemas } from '@/lib/zod';
import { authUserAction } from '@/services';
import { SignInProviders, SubmitButton } from '@/components/complex';

export const SignInForm = ({ formFields, providers, submitBtn }: any) => {
  const printInputs = (data: any) => {
    return data?.map((input: any) => <Input key={input.id} {...input} />);
  };

  const printProviders = (data: any) => {
    return data.map((provider: any) => (
      <SignInProviders
        key={provider.id}
        text={provider.text}
        identifier={provider.key}
      />
    ));
  };

  return (
    <Form
      action={authUserAction}
      schema={schemas.login}
      className='flex flex-col gap-y-5'
    >
      {printInputs(formFields)}
      <SubmitButton
        className='w-full'
        text={submitBtn.text}
        loadingText={submitBtn.loadingText}
      />
      {printProviders(providers)}
    </Form>
  );
};
