'use client';

import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

import { useCart } from '@/store';
import { getCurrency } from '@/services';

import { cn } from '@/lib';

import { animCart } from '@/assets/animations';
import { formatPrice, formatTotalAmount } from '@/helpers/formatters';

import { Button, Title } from '@/components/elements';
import { Lottie } from '@/components/elements/Lottie';

import { CartItem } from '../CartItem';

import lottieAnim from '@/public/LottieEmpty.json';

export const CartList: FC<any> = ({ data }) => {
  const [currency, setCurrency] = useState<number>();

  const cartStore = useCart();

  const { theme } = useTheme();
  const t = useTranslations();

  const { totalPrice } = formatTotalAmount(cartStore.cart);

  const handleBack = () => cartStore.onToggle();

  const fetchCurrency = async () => {
    const response = await getCurrency();

    setCurrency(response);
  };

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
        className='relative flex w-full flex-col items-center justify-center'
      >
        <Button onClick={handleBack} className='btn btn-link text-base normal-case'>
          {data.getBack}
        </Button>

        <Lottie
          text={data.emptyList}
          src={lottieAnim}
          playerClassName={cn(theme === 'sunset' ? 'invert' : 'invert-0')}
        />
      </motion.div>
    );
  }

  return (
    <div className='relative flex w-full flex-col items-start gap-y-6'>
      <Button onClick={handleBack} className='btn btn-link relative -top-2.5 px-0 text-lg normal-case'>
        {t('system.stepBack')}
      </Button>
      <div className='flex w-full flex-col gap-y-6'>
        <Title level='3' className='w-full self-center text-center text-2xl font-light'>
          {t('checkout.title')}
        </Title>
        {cartStore.cart.map((item) => (
          <motion.div layout key={item.id} className='flex gap-x-3 px-5'>
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
        {t('checkout.total')}: {formatPrice(totalPrice, currency)}
      </p>
      <button onClick={() => cartStore.setForm('delivery')} className='btn btn-primary w-full text-base-100'>
        {t('checkout.delivery')}
      </button>
    </div>
  );
};
