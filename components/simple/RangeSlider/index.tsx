'use client';

import { ChangeEvent, useCallback } from 'react';

import { Input } from '@/components/elements';
import { useFilters } from '@/store';

export const RangeSlider = () => {
  const state = useFilters();

  const max = 3000;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      state.onFilter({ key: 'price', value: e.target.value });
    },
    [state]
  );

  return (
    <div className='flex w-full flex-col'>
      <Input
        type='range'
        name='price'
        min={0}
        max={max}
        value={state.options.price}
        onChange={handleChange}
        className='range range-xs'
      />
      <div className='flex w-full justify-between'>
        <span>{state.options.price ?? 0} $</span>
        <span>{max} $</span>
      </div>
    </div>
  );
};
