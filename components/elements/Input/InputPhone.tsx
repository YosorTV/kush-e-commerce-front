'use client';

import { FC } from 'react';
import PhoneInput from 'react-phone-input-2';

import { cn } from '@/lib';

interface IInputPhone {
  value: string;
  id: number | string;
  name: string;
  placeholder: string;
  error: boolean;
}

export const InputPhone: FC<IInputPhone> = ({
  value,
  id,
  name,
  placeholder,
  error,
}) => {
  return (
    <PhoneInput
      value={value}
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
      buttonClass='!bg-transparent hover:!bg-transparent !border-none !outline-none !hover:bg-red-500'
      inputClass={cn(
        '!pl-12 !input !input-bordered !w-full !cursor-pointer !placeholder:text-base-200 !placeholder:text-opacity-45',
        error && '!border-error'
      )}
    />
  );
};
