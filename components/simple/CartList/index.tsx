'use client';

import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useCart } from '@/store';

import { Button, Title } from '@/components/elements';
import { Lottie } from '@/components/elements/Lottie';
import { CartItem } from '../CartItem';

import { animCart } from '@/assets/animations';
import lottieAnim from '@/public/LottieEmpty.json';
import { formatPrice, formatTotalAmount } from '@/helpers/formatters';
import { useLocale } from 'next-intl';
import { getCurrency } from '@/services';
import { useScrollLock } from '@/lib/hooks';

export const CartList: FC<any> = ({ data }) => {
  const locale = useLocale();
  const cartStore = useCart();

  const [currency, setCurrency] = useState<number>();

  const { totalPrice } = formatTotalAmount(cartStore.cart);

  const handleBack = () => cartStore.onToggle();

  const fetchCurrency = async () => {
    const response = await getCurrency();

    setCurrency(response);
  };

  useScrollLock(cartStore.isOpen);

  useEffect(() => {
    if (cartStore.cart.length > 0) {
      fetchCurrency();
    }
  }, [cartStore.isOpen]);

  if (!cartStore.cart.length) {
    return (
      <motion.div
        initial={animCart.basket.initial}
        animate={animCart.basket.animate}
        exit={animCart.basket.exit}
        className='relative flex h-2md w-full flex-col items-center justify-center'
      >
        <Button onClick={handleBack} className='btn btn-link absolute -left-5 -top-5 text-lg'>
          {data.getBack}
        </Button>

        <Lottie text={data.emptyList} src={lottieAnim} />
      </motion.div>
    );
  }

  return (
    <div className='relative flex w-full flex-col items-start gap-y-6'>
      <Button onClick={handleBack} className='btn btn-link px-0 text-lg normal-case'>
        {data.getBack}
      </Button>
      <div className='flex w-full flex-col gap-y-6'>
        <Title level='3' className='w-full self-center text-center text-2xl font-light'>
          {data.title}
        </Title>
        {cartStore.cart.map((item) => (
          <motion.div layout key={item.id} className='flex gap-x-3'>
            <CartItem
              data={item}
              onAdd={() => cartStore.onIncrease(item)}
              currency={currency}
              onRemove={() => cartStore.onRemove(item)}
            />
          </motion.div>
        ))}
      </div>
      <p className='font-semibold capitalize'>
        {data.totalPrice}: {formatPrice(totalPrice, locale, currency)}
      </p>
      <button disabled onClick={() => cartStore.setForm('checkout')} className='btn btn-primary w-full text-base-100'>
        {data.checkout}
      </button>
    </div>
  );
};
