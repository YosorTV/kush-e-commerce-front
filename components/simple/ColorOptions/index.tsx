'use client';

import { FC } from 'react';
import { useCart } from '@/store';
import { useTranslations } from 'next-intl';
import { ProductOption } from '../ProductOption';
import { cn } from '@/lib';

interface IColorOptions {
  data?: any[];
  title?: string;
}

export const ColorOptions: FC<IColorOptions> = ({ data, title }) => {
  const state = useCart();
  const t = useTranslations('color');

  const printElement = ({ colors, id }: any) => {
    return (
      <ProductOption
        key={id}
        id={`color-${id}`}
        name='color'
        checked={state.formState.color === colors}
        title={t(colors?.trim())}
        onChange={() => state.onAdd({ key: 'color', value: colors })}
        className={state.formState.color === colors && 'underline'}
      />
    );
  };

  return (
    <div className='flex flex-col gap-y-5'>
      {title && <p className='text-lg font-semibold'>{title}</p>}
      {data.length > 0 && (
        <div className={cn('flex gap-5 sm:flex-row', data.length >= 4 ? 'flex-col' : 'flex-row')}>
          {data.map(printElement)}
        </div>
      )}
    </div>
  );
};
