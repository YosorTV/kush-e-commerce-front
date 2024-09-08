'use client';

import { FC } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

import { cn } from '@/lib';

import { ClassNamesType, SelectProps } from '@/types/components/elements/select.types';

const classes: ClassNamesType = {
  container: () => 'w-full',
  singleValue: () => '!text-base-200',
  valueContainer: () => '!text-white !p-0',
  input: () => '!text-base-200',
  menu: () => '!bg-base-100 !rounded-lg mt-1 !z-20',
  control: () => 'flex items-center transition duration-150 !bg-base-100 !input !input-bordered',
  option: (state) => {
    return cn(
      'cursor-pointer px-4 py-2',
      { '!bg-neutral !text-base-300': state.isFocused || state.isSelected },
      {
        'bg-base-100': !state.isSelected
      },
      'hover:bg-neutral hover:text-base-300'
    );
  }
};

export const AsyncSelect: FC<SelectProps> = ({ loadOptions, onChange, value, placeholder = 'Search...' }) => {
  return (
    <AsyncPaginate
      isClearable
      value={value}
      defaultOptions
      classNames={classes}
      placeholder={placeholder}
      loadOptions={loadOptions}
      onChange={onChange}
      additional={{ page: 1 }}
    />
  );
};
