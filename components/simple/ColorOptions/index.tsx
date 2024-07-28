'use client';

import { FC } from 'react';
import { cn } from '@/lib';
import { useCart } from '@/store';

interface IColorOptions {
  data?: any[];
  title?: string;
}

export const ColorOptions: FC<IColorOptions> = ({ data, title }) => {
  const state = useCart();

  const printElement = (el: any) => {
    return (
      <label
        key={el.id}
        htmlFor={el.id}
        className='flex cursor-pointer items-center justify-center gap-x-3 underline-offset-8 hover:underline'
      >
        <input
          id={el.id}
          type='radio'
          name='color'
          value={el.colors}
          onChange={() => state.onAdd({ key: 'color', value: el.colors })}
          className={cn('radio', el.colors === 'yellow' && 'radio-warning')}
        />
        <span className='font-semibold text-base-200'>{el.title}</span>
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
