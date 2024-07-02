'use client';

import { FC } from 'react';
import PhoneInput from 'react-phone-input-2';

import { cn } from '@/lib';
import { InputProps } from '@/types/components';

export const InputPhone: FC<InputProps> = ({
  value,
  id,
  name,
  placeholder,
  error,
  className,
}) => {
  return (
    <PhoneInput
      value={value as string}
      inputProps={{
        id,
        name,
        placeholder,
        type: 'tel',
      }}
      key={id}
      excludeCountries={['ru', 'by']}
      country='ua'
      regions={['europe']}
      autocompleteSearch
      dropdownClass='top-10 !rounded-lg !bg-base-100 md:!w-72 !w-[90vw]'
      buttonClass='!bg-transparent hover:!bg-transparent !border-none !outline-none'
      inputClass={cn(
        '!pl-12 !input !input-bordered !w-full !cursor-pointer !placeholder:text-gray-500',
        error && '!border-error',
        className
      )}
    />
  );
};
