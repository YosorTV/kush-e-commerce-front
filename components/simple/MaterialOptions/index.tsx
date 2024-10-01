'use client';

import { FC } from 'react';
import { useCart } from '@/store';
import { useTranslations } from 'next-intl';
import { ProductOption } from '../ProductOption';
import { cn } from '@/lib';

interface IMaterialOptions {
  data?: any[];
  title?: string;
}

export const MaterialOptions: FC<IMaterialOptions> = ({ data = [], title }) => {
  const state = useCart();

  const t = useTranslations('material');

  const printElement = ({ value, id }: any) => {
    return (
      <ProductOption
        key={id}
        id={`material-${id}`}
        name='material'
        checked={state.formState.material === value}
        title={t(value.trim())}
        onChange={() => state.onAdd({ key: 'material', value })}
        className={state.formState.material === value && 'underline'}
      />
    );
  };

  return (
    <div className='flex flex-col gap-y-5'>
      {title && <p className='text-lg font-semibold'>{title}</p>}
      {data.length > 0 && (
        <div className={cn('flex gap-5', data.length >= 4 ? 'flex-col' : 'flex-row')}>{data.map(printElement)}</div>
      )}
    </div>
  );
};
