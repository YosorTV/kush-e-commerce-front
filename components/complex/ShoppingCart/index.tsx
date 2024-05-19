'use client';

import { FC, useEffect } from 'react';

import { useCart } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';

import { animCart } from '@/assets/animations';
import { CartList } from '@/components/simple';
import { ShoppingCartProps } from '@/types/components/complex';
import { Checkout } from '../Checkout';
import { Success } from '../Success';

export const ShoppingCart: FC<ShoppingCartProps> = ({ data, userId }) => {
  const cartStore = useCart();

  const contentZone = {
    cart: <CartList data={data} />,
    checkout: <Checkout userId={userId} />,
    success: <Success />,
  };

  useEffect(() => {
    if (cartStore.isOpen) {
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.body.classList.add('overflow-auto');
    };
  }, [cartStore.isOpen]);

  return (
    <AnimatePresence mode='wait'>
      {cartStore.isOpen && (
        <motion.div
          initial={animCart.fade.initial}
          animate={animCart.fade.animate}
          exit={animCart.fade.exit}
          onClick={() => cartStore.onToggle()}
          className='fixed left-0 top-0 z-20 h-screen w-full bg-black/50'
        >
          <motion.div
            layout
            onClick={(e) => e.stopPropagation()}
            className='absolute right-0 top-0 z-30 h-screen w-full overflow-y-auto bg-base-100 p-8 md:w-[600px]'
          >
            <div className='flex w-full'>{contentZone[cartStore.key]}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
