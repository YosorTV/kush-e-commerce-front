'use client';

/* eslint-disable react-hooks/exhaustive-deps */

import { FC, useEffect, useState } from 'react';

import { useCart } from '@/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { AnimatePresence, motion } from 'framer-motion';

import { formatTotalAmount } from '@/helpers/formatters';
import { useTheme } from 'next-themes';
import { CheckoutForm } from '@/components/forms';
import { getIntentId } from '@/services/api/checkout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

export const Checkout: FC<any> = ({ userId }) => {
  const cartStore = useCart();
  const { resolvedTheme } = useTheme();

  const [secret, setSecret] = useState<string | null>(null);

  const { totalPrice } = formatTotalAmount(cartStore.cart);

  const fetchSecret = async () => {
    const { data } = await getIntentId({
      userId,
      totalPrice,
      items: cartStore.cart,
      paymentIntentId: cartStore?.paymentIntentId || null,
    });

    if (data) {
      setSecret(data.client_secret);
      cartStore.setPaymentIntentId(data.id);
    }
  };

  useEffect(() => {
    fetchSecret();
  }, []);

  const handleBack = () => cartStore.setForm('cart');

  const options: StripeElementsOptions = {
    clientSecret: secret,
    appearance: {
      theme: resolvedTheme === 'light' ? 'stripe' : 'night',
      labels: 'floating',
    },
  };

  return (
    <section className='relative flex flex-1 flex-col gap-y-5 py-12'>
      <button
        type='button'
        onClick={handleBack}
        className='absolute -left-5 -top-5 text-lg'
      >
        Back to cart
      </button>
      <AnimatePresence mode='wait'>
        {secret ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm secret={secret} totalPrice={totalPrice} />
            </Elements>
          </motion.div>
        ) : (
          <p>Loading</p>
        )}
      </AnimatePresence>
    </section>
  );
};
