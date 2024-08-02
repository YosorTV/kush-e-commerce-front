'use client';

import { FC } from 'react';
import { useCart } from '@/store';
import { useTranslations } from 'next-intl';
import { ProductOption } from '../ProductOption';

interface IMaterialOptions {
  data?: any[];
  title?: string;
}

export const MaterialOptions: FC<IMaterialOptions> = ({ data = [], title }) => {
  const state = useCart();

  const t = useTranslations('material');

  const printElement = ({ materials, id }: any) => {
    return (
      <ProductOption
        key={id}
        id={`material-${id}`}
        name='material'
        checked={state.formState.material === materials}
        title={t(materials?.trim())}
        onChange={() => state.onAdd({ key: 'material', value: materials })}
        className={state.formState.material === materials && 'underline'}
      />
    );
  };

  return (
    <div className='flex flex-col gap-y-5'>
      {title && <p className='text-lg font-semibold'>{title}</p>}
      {data.length > 0 && (
        <div className='flex flex-col gap-5 sm:flex-row'>
          {data.map(printElement)}
        </div>
      )}
    </div>
  );
};
