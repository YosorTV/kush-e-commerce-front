'use client';

import { Form, Input } from '@/components/elements';
import { SubmitButton } from '@/components/simple';
import { DeleteButton } from '@/components/simple/DeleteButton';

import { updateProfileAction } from '@/services';
import { schemas } from '@/lib';

export const ProfileForm = ({ data, state }: any) => {
  const formActions = (action: any) => {
    const actionType: any = {
      delete: (
        <DeleteButton
          key={action.id}
          className='w-1/2'
          text={action.text ?? 'Delete'}
          loadingText={action?.loadingText ?? 'Loading...'}
          onClick={() => ({})}
        />
      ),
      submit: (
        <SubmitButton
          key={action.id}
          className='w-1/2'
          text={action?.text ?? 'Apply'}
          loadingText={action?.loadingText ?? 'Loading...'}
        />
      )
    };

    return actionType[action.type];
  };

  const printActions = (data: any) => data?.map(formActions);

  const printInputs = (data: any) => {
    return data?.map((input: any) => <Input key={input.id} {...input} />);
  };

  return (
    <Form
      schema={schemas.profile}
      action={updateProfileAction}
      className='m-auto flex w-2/3 flex-col justify-center gap-y-5 pb-10'
    >
      <div className='flex flex-col'>
        <div className='flex flex-col gap-x-5'>
          <Input type='hidden' name='userId' value={state.id} />
          {printInputs(data.general)}
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-x-5'>{printInputs(data.additional)}</div>
      </div>
      <div className='flex items-center justify-center gap-5'>{printActions(data.actions)}</div>
    </Form>
  );
};
