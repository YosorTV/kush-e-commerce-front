'use client';

import { cormorant } from '@/assets/fonts';
import { Form, Input } from '@/components/elements';
import { cn } from '@/lib';
import { forgotPassword } from '@/services';

export const SubscribeForm = ({ formField, className }: any) => {
  return (
    <Form action={forgotPassword} className={className}>
      <Input
        label={formField.label}
        placeholder={formField.placeholder}
        type={formField.type}
        name={formField.name}
        className='w-full'
        labelStyle={cn('text-xl', cormorant.className)}
      />
    </Form>
  );
};
