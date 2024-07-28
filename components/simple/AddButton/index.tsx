'use client';

import { FC, useState } from 'react';

import { useCart } from '@/store';
import { AddCartProps } from '@/types/components';

export const AddCart: FC<AddCartProps> = ({ data, text }) => {
  const state = useCart();
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
      disabled={added}
      onClick={handleAdd}
      className='btn btn-neutral no-animation btn-block mt-6 rounded-none text-xl font-semibold uppercase text-white'
    >
      {text}
    </button>
  );
};
