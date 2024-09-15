'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

import { useLocale } from 'next-intl';

import { useCart } from '@/store';
import { getCurrency, paymentCreate } from '@/services';

import { liqPayAdapter, paymentDataAdapter } from '@/adapters/payment';
import { Button } from '@/components/elements';
import { useScrollLock } from '@/lib/hooks';
import { paymentCallback } from '@/services/api/payment-update';

export const CartCheckout: React.FC = () => {
  const locale = useLocale();
  const cartStore = useCart();

  const [currency, setCurrency] = useState<number>(0);
  const [liqPayData, setLiqPayData] = useState({
    data: '',
    signature: ''
  });

  const handleBack = () => cartStore.setForm('delivery');

  useScrollLock(cartStore.isOpen);

  const fetchCurrency = async () => {
    const response = await getCurrency();

    setCurrency(response);
  };

  const fetchLiqPayData = async () => {
    const options = paymentDataAdapter({
      locale,
      currency,
      data: cartStore.cart
    });

    const response = await paymentCreate(options);

    setLiqPayData(response);
  };

  useEffect(() => {
    if (cartStore.key === 'checkout') {
      fetchCurrency();
      fetchLiqPayData();
    }
  }, [cartStore.key, currency]);

  useEffect(() => {
    if (liqPayData.data && liqPayData.signature && cartStore.key === 'checkout') {
      const container = document.getElementById('liqpay_checkout');

      if (container) {
        container.innerHTML = '';
      }

      window.LiqPayCheckoutCallback = function () {
        if (typeof LiqPayCheckout !== 'undefined') {
          LiqPayCheckout.init(liqPayAdapter(liqPayData)).on('liqpay.callback', async ({ data, signature }) => {
            await paymentCallback({ data, signature });
          });
        }
      };

      window.LiqPayCheckoutCallback();
    }
  }, [liqPayData, cartStore.key]);

  return (
    <div className='w-full'>
      <Button onClick={handleBack} className='btn btn-link justify-start px-0 text-lg normal-case'>
        Повернутись
      </Button>

      <div id='liqpay_checkout' />
    </div>
  );
};
