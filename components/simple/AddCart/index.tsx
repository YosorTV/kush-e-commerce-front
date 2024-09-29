'use client';

import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useCart } from '@/store';
import { AddCartProps } from '@/types/components';

export const AddCart: FC<AddCartProps> = ({ data, isDisabled = false }) => {
  const state = useCart();
  const t = useTranslations('cart');

  const [added, setAdded] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const isButtonDisabled = () => {
    const { formState } = state;

    return Object.values(formState).some((value) => value === null) || added;
  };

  useEffect(() => {
    state.syncCartData(data);
  }, []);

  useEffect(() => {
    const disabled = isButtonDisabled();

    setDisabled(disabled);
  }, [state.formState, data]);

  const handleAdd = () => {
    state.onSubmit(state.formState);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <button
      aria-label='add to cart'
      disabled={disabled}
      onClick={handleAdd}
      className='btn btn-neutral no-animation btn-block rounded-none text-xl font-semibold text-white disabled:!bg-gray-500/50'
    >
      {t('add')}
    </button>
  );
};
