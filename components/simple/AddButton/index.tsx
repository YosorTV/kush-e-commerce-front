'use client';

import { FC, useState } from 'react';

import { useCart } from '@/store';
import { AddCartProps } from '@/types/components';

export const AddCart: FC<AddCartProps> = ({ data, text }) => {
  const cartStore = useCart();

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    cartStore.onAdd(data);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <button
      onClick={handleAdd}
      className='btn btn-primary my-3 font-medium text-white'
      disabled={added}
    >
      {text}
    </button>
  );
};
