'use client';

import { cormorant } from '@/assets/fonts';
import { SignInProviders } from '@/components/complex';
import { Form, Input, NextLink, Title } from '@/components/elements';
import { SubmitButton } from '@/components/simple';
import { cn } from '@/lib';
import { schemas } from '@/lib/zod';
import { authUserAction } from '@/services';
import { StrapiLinkType } from '@/types/components';

export const SignInForm = ({ data }: any) => {
  console.log('data: ', data);
  const printInputs = (data: any) => {
    if (!data) return null;

    return data.map((input: any) => <Input key={input.id} {...input} />);
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

  const printLinks = (links: StrapiLinkType[]) => {
    if (!links) return;

    return links.map((link: StrapiLinkType) => (
      <NextLink
        key={link.id}
        href={link.url}
        replace={link.isExternal}
        className='link text-base-200'
      >
        {link.text}
      </NextLink>
    ));
  };

  return (
    <Form
      method='post'
      id='signin-form'
      action={authUserAction}
      schema={schemas.login}
      className='auth-page_form !md:w-2/3 !xl:!w-1/3 flex flex-col  gap-y-5 bg-base-100'
    >
      <Title
        level='1'
        className={cn(
          cormorant.className,
          'text-center text-4xl text-base-200 md:text-5xl'
        )}
      >
        {data.title}
      </Title>
      <div className='mx-auto flex w-full flex-col gap-y-5'>
        {printInputs(data.formFields)}
      </div>
      <div className='flex w-full flex-col justify-between gap-5 xs:flex-row md:gap-10'>
        <div>
          <Input
            id={data.rememberMe.id}
            name={data.rememberMe.name}
            label={data.rememberMe.label}
            type='checkbox'
            className='checkbox checked:fill-base-200'
            labelStyle='text-base-200 text-sm whitespace-nowrap md:text-lg cursor-pointer'
            containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
          />
        </div>
        <div className='flex flex-col text-base md:text-lg'>
          {printLinks(data?.additionalLinks)}
        </div>
      </div>
      {printProviders(data.providers)}
      <div className='divider my-0 px-5' />
      <SubmitButton
        className='w-full !bg-base-200 !text-base-100'
        text={data.submitBtn.text}
        loadingText={data.submitBtn.loadingText}
      />
      <div className='divider my-0 px-5' />
      <NextLink
        key={data.createAccountLink.id}
        href={data.createAccountLink.url}
        replace={data.createAccountLink.isExternal}
        className='btn w-full rounded-none border-none bg-transparent uppercase text-base-200 outline-none hover:bg-base-200 hover:text-base-100'
      >
        {data.createAccountLink.text}
      </NextLink>
    </Form>
  );
};
