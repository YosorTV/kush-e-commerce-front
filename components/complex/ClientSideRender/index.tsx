'use client';

import { FC } from 'react';

import { Toaster } from 'sonner';

import { Hydrate } from '@/components/simple';
import { useCart } from '@/store';
import { ShoppingCartData } from '@/types/components/complex';
import { Portal } from '@/components/elements';
import { ShoppingCart } from '../ShoppingCart';

export const ClientSideRender: FC<ShoppingCartData> = ({ data }) => {
  const cartStore = useCart();

  return (
    <Hydrate>
      <Toaster position='top-right' richColors closeButton />
      <Portal selector='portal' show={cartStore.isOpen}>
        <ShoppingCart data={data} />
      </Portal>
    </Hydrate>
  );
};
