'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

import { useCart } from '@/store';
import { cn } from '@/lib';

import { Title } from '@/components/elements';
import { Lottie } from '@/components/elements/Lottie';
import { CartItem } from '../CartItem';

import { CartItemType } from '@/types/store';

import { animCart } from '@/assets/animations';
import { roboto } from '@/assets/fonts';
import lottieAnim from '@/public/LottieEmpty.json';
import { formatPrice, formatTotalAmount } from '@/helpers/formatters';

export const CartList: FC<any> = ({ data }) => {
  const cartStore = useCart();

  const { totalPrice } = formatTotalAmount(cartStore.cart);

  const handleBack = () => cartStore.onToggle();

  if (!cartStore.cart.length)
    return (
      <motion.div
        initial={animCart.basket.initial}
        animate={animCart.basket.animate}
        exit={animCart.basket.exit}
        className='relative flex h-[80vh] w-full flex-col items-center justify-center'
      >
        <button
          onClick={handleBack}
          className='btn btn-link absolute -left-5 -top-5 text-lg'
        >
          {data.getBack}
        </button>

        <Lottie text={`${data.emptyList} ☹️`} src={lottieAnim} />
      </motion.div>
    );

  const printCartItem = (item: CartItemType) => {
    return (
      <motion.div layout key={item.id} className='mt-5 flex gap-2.5'>
        <CartItem
          data={item}
          onAdd={() => cartStore.onAdd(item)}
          onRemove={() => cartStore.onRemove(item)}
        />
      </motion.div>
    );
  };

  return (
    <div className='relative mt-5 flex w-full flex-col items-start gap-y-5'>
      <button onClick={handleBack} className='btn btn-link px-0 text-lg'>
        {data.getBack}
      </button>
      <div className='flex w-full flex-col'>
        <Title
          level='3'
          className={cn(
            'w-full self-center text-center text-2xl font-light underline',
            roboto.className
          )}
        >
          {data.title}
        </Title>
        {cartStore.cart.map(printCartItem)}
      </div>
      <p className='font-semibold capitalize'>
        {data.totalPrice}: {formatPrice(totalPrice)}
      </p>
      <button
        onClick={() => cartStore.setForm('checkout')}
        className='btn btn-primary w-full text-base-100'
      >
        {data.checkout}
      </button>
    </div>
  );
};
