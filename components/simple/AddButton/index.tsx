'use client';

import { FC, useState } from 'react';

import { useCart } from '@/store';
import { AddCartProps } from '@/types/components';
import { useTranslations } from 'next-intl';

export const AddCart: FC<AddCartProps> = ({ data }) => {
  const state = useCart();
  const t = useTranslations('cart');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    state.onSubmit({ ...state.formState, ...data });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <button
      aria-label='Add'
      disabled={added}
      onClick={handleAdd}
      className='btn btn-neutral no-animation btn-block mt-6 rounded-none text-xl font-semibold text-white disabled:bg-gray-500/50'
    >
      {t('add')}
    </button>
  );
};
