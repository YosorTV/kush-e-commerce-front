'use client';

import { FC } from 'react';
import { cn } from '@/lib';
import { useCart } from '@/store';

interface IMaterialOptions {
  data?: any[];
  title?: string;
}

export const MaterialOptions: FC<IMaterialOptions> = ({ data, title }) => {
  const state = useCart();

  const printElement = ({ materials, title, id }: any) => {
    return (
      <label
        key={id}
        className={cn(
          'flex cursor-pointer items-center justify-center underline-offset-8 hover:underline',
          state.formState.material === materials && 'underline'
        )}
      >
        <input
          type='radio'
          name='material'
          value={materials}
          className='hidden'
          onChange={() => state.onAdd({ key: 'material', value: materials })}
        />
        <span className='font-semibold text-base-200'>{title}</span>
      </label>
    );
  };

  return (
    <div>
      {title && <p className='mb-2 text-lg font-semibold'>{title}</p>}
      {data.length > 0 && (
        <div className='flex gap-x-3'>{data.map(printElement)}</div>
      )}
    </div>
  );
};
