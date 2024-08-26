'use client';

import { ChangeEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { useFilters } from '@/store';

import { Input } from '@/components/elements';

type TSize = {
  id: number;
  size: string;
};

export const SizeList = () => {
  const state = useFilters();
  const searchParams = useSearchParams();
  const chosenSizes = searchParams.getAll('sizes');

  const sizes: TSize[] = [
    { id: 1, size: '8' },
    { id: 2, size: '10' },
    { id: 3, size: '12' },
    { id: 4, size: '14' },
    { id: 5, size: '16' },
    { id: 6, size: '18' }
  ];

  useEffect(() => {
    state.onFilter({ key: 'sizes', value: chosenSizes });
  }, []);

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    const newSizes = checked ? [...state.options.sizes, value] : state.options.sizes.filter((size) => size !== value);

    state.onFilter({ key: 'sizes', value: newSizes as string[] });
  };

  const printSizeList = (el: TSize) => (
    <Input
      key={el.id}
      id={el.size}
      name={el.size}
      label={el.size}
      type='checkbox'
      value={el.size}
      checked={state.options?.sizes?.includes(el.size)}
      onChange={handleSizeChange}
      className='checkbox checked:fill-base-200'
      labelStyle='text-base-200 font-medium text-lg cursor-pointer'
      containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
    />
  );

  return <div className='form-control gap-y-2.5'>{sizes.map(printSizeList)}</div>;
};
