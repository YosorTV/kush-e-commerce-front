'use client';

import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import { liqPayAdapter } from '@/adapters/payment';
import { Button } from '@/components/elements';
import { formatPrice } from '@/helpers/formatters';
import { toaster } from '@/lib';
import { useScrollLock } from '@/lib/hooks';
import { paymentCallback } from '@/services/api/payment-update';
import { useCart } from '@/store';
import { CartItemType } from '@/types/store';
import { debounce } from 'lodash';

interface ICartCheckout {
  currency: number;
  liqPayData: { data: string; signature: string };
}

export const CartCheckout: FC<ICartCheckout> = ({ currency, liqPayData }) => {
  const locale = useLocale();
  const cartStore = useCart();
  const t = useTranslations();
  const { data: session } = useSession();

  const liqPayContainerRef = useRef<HTMLDivElement | null>(null);

  const handleBack = useCallback(() => cartStore.setForm('delivery'), [cartStore]);

  useScrollLock(cartStore.isOpen);

  const products = useMemo(() => {
    return cartStore.cart.map((item: CartItemType) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      images: item.images,
      price: formatPrice(item.unit_amount, currency).replace(/[^\d.,-]/g, ''),
      url: item.url
    }));
  }, [cartStore.cart, locale, currency]);

  const debouncedCallback = useCallback(
    debounce(async ({ data, signature, paytype, status }) => {
      const result = await paymentCallback({
        data,
        signature,
        status,
        paytype,
        products,
        userId: Number(session?.user?.id) || null,
        customer: {
          ...cartStore.delivery,
          customer_city: cartStore.delivery.self ? '' : cartStore.delivery.novapostCity.label,
          customer_warehouse: cartStore.delivery.self ? '' : cartStore.delivery.novapostWarehouse.label,
          self_delivery: cartStore.delivery.self
        }
      });

      if (result.status === 200) {
        cartStore.globalReset();
        cartStore.setForm('success');
      }

      toaster({ key: 'success', message: result.message });

      return result;
    }, 500),

    [cartStore.delivery, products, session]
  );

  useEffect(() => {
    if (liqPayData.data && liqPayData.signature) {
      if (liqPayContainerRef.current) {
        liqPayContainerRef.current.innerHTML = '';
      }

      const liqPayInstance = LiqPayCheckout.init(liqPayAdapter(liqPayData));
      liqPayInstance.on('liqpay.callback', debouncedCallback);
    }

    return () => {
      liqPayContainerRef.current = null;
    };
  }, [liqPayData]);

  return (
    <div className='w-full'>
      <Button onClick={handleBack} className='btn btn-link relative left-5 mx-5 justify-start'>
        {t('system.stepBack')}
      </Button>

      <div ref={liqPayContainerRef} id='liqpay_checkout' />
    </div>
  );
};
