'use client';

import { Form, Input, Title } from '@/components/elements';
import { SubmitButton } from '@/components/simple';
import { DeleteButton } from '@/components/simple/DeleteButton';

import { updateProfileAction } from '@/services';
import { schemas } from '@/lib';

export const ProfileForm = ({ data, state }: any) => {
  const printActions = (data: any) => data?.map(formActions);

  const printInputs = (data: any) => {
    return data?.map((input: any) => <Input key={input.id} {...input} />);
  };

  const inputFieldAdapter = (input: any, state: any) => ({ ...input, value: state[input.name] });

  const updatedGeneralFields = data.general.map((input: any) => inputFieldAdapter(input, state));
  const updatedContactsFields = data.contacts.map((input: any) => inputFieldAdapter(input, state));

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

  return (
    <Form
      schema={schemas.profile}
      action={updateProfileAction}
      className='mt-5 flex flex-col justify-center gap-5 p-10'
    >
      <Title level='1' variant='subheading' className='text-center lg:text-left'>
        {data?.generalTitle}
      </Title>
      <div className='flex flex-col gap-5 lg:flex-row'>{printInputs(updatedGeneralFields)}</div>
      <div className='flex flex-col gap-y-5'>
        <Title level='3'>{data?.contactsTitle}</Title>
        <div className='flex flex-col gap-5 lg:flex-row'>{printInputs(updatedContactsFields)}</div>
      </div>
      <div className='flex flex-col gap-y-5'>
        <Title level='3'>{data?.additionalTitle}</Title>
        <div className='flex flex-col gap-5 lg:flex-row'>{printInputs(data.additional)}</div>
        <Input type='hidden' hidden name='userId' value={state.id} className='hidden' />
      </div>
      <div className='mt-10 flex items-center justify-center gap-5'>{printActions(data.actions)}</div>
    </Form>
  );
};
