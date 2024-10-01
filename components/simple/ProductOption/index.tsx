import { Input } from '@/components/elements';
import { cn } from '@/lib';
import React from 'react';

export const ProductOption = ({ id, value, title, name, className, onChange, checked }: any) => {
  return (
    <label
      key={id}
      htmlFor={id}
      className={cn(
        'flex w-auto cursor-pointer items-center justify-start gap-3 underline-offset-8 hover:underline',
        className
      )}
    >
      <Input
        id={id}
        type='radio'
        defaultChecked={checked}
        name={name}
        value={value}
        onChange={onChange}
        className='radio w-6'
      />
      <span className='w-full whitespace-pre-wrap text-pretty font-semibold text-base-200'>{title}</span>
    </label>
  );
};
