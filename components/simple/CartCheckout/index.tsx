'use client';

import { useEffect, useMemo, useRef, FC, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';

import { useCart } from '@/store';
import { liqPayAdapter } from '@/adapters/payment';
import { Button } from '@/components/elements';
import { paymentCallback } from '@/services/api/payment-update';
import { formatPrice } from '@/helpers/formatters';
import { CartItemType } from '@/types/store';
import { debounce } from 'lodash';

interface ICartCheckout {
  currency: number;
  liqPayData: { data: string; signature: string };
}

export const CartCheckout: FC<ICartCheckout> = ({ currency, liqPayData }) => {
  const locale = useLocale();
  const cartStore = useCart();
  const { data: session } = useSession();

  const liqPayContainerRef = useRef<HTMLDivElement | null>(null);

  const handleBack = useCallback(() => cartStore.setForm('delivery'), [cartStore]);

  const products = useMemo(() => {
    return cartStore.cart.map((item: CartItemType) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      images: item.images,
      price: formatPrice(item.unit_amount, locale, currency).replace(/[^\d.,-]/g, '')
    }));
  }, [cartStore.cart, locale, currency]);

  const debouncedCallback = useCallback(
    debounce(async ({ data, signature }) => {
      const customer = {
        ...cartStore.delivery,
        customer_city: cartStore.delivery.self ? '' : cartStore.delivery.novapostCity.label,
        customer_warehouse: cartStore.delivery.self ? '' : cartStore.delivery.novapostWarehouse.label,
        self_delivery: cartStore.delivery.self
      };

      const result = await paymentCallback({
        data,
        signature,
        products,
        customer,
        userId: Number(session?.data?.id) || null
      });

      if (result.status === 200) {
        cartStore.setForm('success');
      }
    }, 500),
    [cartStore.delivery, products, session]
  );

  useEffect(() => {
    if (liqPayData.data && liqPayData.signature) {
      if (liqPayContainerRef.current) {
        liqPayContainerRef.current.innerHTML = '';
      }

      if (typeof LiqPayCheckout !== 'undefined') {
        const liqPayInstance = LiqPayCheckout.init(liqPayAdapter(liqPayData));
        liqPayInstance.on('liqpay.callback', debouncedCallback);
      }
    }

    return () => {
      liqPayContainerRef.current = null;
    };
  }, [liqPayData]);

  return (
    <div className='w-full'>
      <Button onClick={handleBack} className='btn btn-link justify-start px-0 text-lg normal-case'>
        Повернутись
      </Button>
      <div ref={liqPayContainerRef} id='liqpay_checkout' />
    </div>
  );
};
