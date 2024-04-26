'use client';

import { FC } from 'react';

import { useCart } from '@/store';
import { IoCart } from 'react-icons/io5';

import { Hydrate } from '@/components/simple';
import { Badge } from '@/components/elements/Badge';

export const CartIcon: FC = () => {
  const cartStore = useCart();

  const handleToggle = () => cartStore.onToggle();

  return (
    <button
      onClick={handleToggle}
      className='relative flex h-10 w-10 cursor-pointer items-center border-none bg-none outline-none'
    >
      {cartStore.cart.length > 0 && (
        <Hydrate>
          <Badge counter={cartStore.cart.length} />
        </Hydrate>
      )}
      <IoCart style={{ width: 32, height: 32 }} />
    </button>
  );
};
