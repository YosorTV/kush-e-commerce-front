'use client';

import { FC, useEffect, useState } from 'react';

import { useCart } from '@/store';
import { AddCartProps } from '@/types/components';
import { useTranslations } from 'next-intl';

export const AddCart: FC<AddCartProps> = ({ data, isDisabled }) => {
  const [added, setAdded] = useState(false);

  const t = useTranslations('cart');
  const state = useCart();

  useEffect(() => {
    state.syncCartData(data);
  }, [data]);

  const isButtonDisabled = () => {
    const { formState } = state;

    return !Object.values(formState).some((value) => value === null) || added || isDisabled;
  };

  const disabled = isButtonDisabled();

  const handleAdd = () => {
    state.onSubmit(state.formState);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <button
      aria-label='Add'
      disabled={!disabled}
      onClick={handleAdd}
      className='btn btn-neutral no-animation btn-block rounded-none text-xl font-semibold text-white disabled:!bg-gray-500/50'
    >
      {t('add')}
    </button>
  );
};
