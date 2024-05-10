'use client';

import { FC } from 'react';

import { useCart } from '@/store';
import { IoCart } from 'react-icons/io5';

import { Badge } from '@/components/elements/Badge';

export const CartIcon: FC = () => {
  const cartStore = useCart();

  const handleToggle = () => cartStore.onToggle();

  return (
    <button
      onClick={handleToggle}
      className='relative flex h-10 w-10 cursor-pointer items-center border-none bg-none outline-none'
    >
      {cartStore.cart.length > 0 && <Badge counter={cartStore.cart.length} />}
      <IoCart style={{ width: 28, height: 28 }} />
    </button>
  );
};
