'use client';

import { FC } from 'react';

import { Input } from '@/components/elements';

import { ISortFields, TSortField } from '@/types/components';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/store';

export const SortFields: FC<ISortFields> = ({ data }) => {
  const state = useFilters();
  const t = useTranslations('sort');

  const handleChange = (name: string) => {
    state.onFilter({ key: 'sortValue', value: name });
  };

  const printSortField = (field: TSortField) => (
    <Input
      type='radio'
      key={field.id}
      id={`${field.id}`}
      name={field.name}
      label={t(field.label)}
      checked={state.options.sortValue === field.name}
      onChange={() => handleChange(field.name)}
      className='radio checked:bg-base-200'
      labelStyle='text-base-200 font-medium text-lg'
      containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
    />
  );

  return data.map(printSortField);
};
