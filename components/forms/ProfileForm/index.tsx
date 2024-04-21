'use client';

import { Form, Input } from '@/components/elements';
import { SubmitButton } from '@/components/simple';
import { DeleteButton } from '@/components/simple/DeleteButton';
import { schemas } from '@/lib';

export const ProfileForm = ({ data, state }: any) => {
  const formActions = (action: any) => {
    const actionType: any = {
      delete: (
        <DeleteButton
          className='w-1/2'
          text={action.text ?? 'Delete'}
          loadingText={action?.loadingText ?? 'Loading...'}
          onClick={() => ({})}
        />
      ),
      submit: (
        <SubmitButton
          className='w-1/2'
          text={action?.text ?? 'Apply'}
          loadingText={action?.loadingText ?? 'Loading...'}
        />
      ),
    };

    return actionType[action.type];
  };

  const printActions = (data: any) => data?.map(formActions);

  const printInputs = (data: any) =>
    data?.map((input: any) => <Input key={input.id} {...input} />);

  return (
    <Form
      action={null}
      schema={schemas.profile}
      className='m-auto flex w-2/3 flex-col justify-center gap-y-5'
    >
      <div className='flex flex-col'>
        <div className='flex flex-col gap-x-5'>
          {printInputs(data?.general)}
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-x-5'>
          {printInputs(data?.additional)}
        </div>
      </div>
      <div className='flex items-center justify-center gap-5'>
        {printActions(data?.actions)}
      </div>
    </Form>
  );
};
