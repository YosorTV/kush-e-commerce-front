'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import { useCart } from '@/store';

import { CartList } from '@/components/simple';
import { ShoppingCartProps } from '@/types/components/complex';
import { Success } from '../Success';
import { BsFillBagFill } from 'react-icons/bs';
import { Button, Portal, Sidebar } from '@/components/elements';
import { Badge } from '@/components/elements/Badge';
import { CartDelivery } from '@/components/simple/CartDelivery';
import { CartCheckout } from '@/components/simple/CartCheckout';
import { getCurrency, paymentCreate } from '@/services';
import { paymentDataAdapter } from '@/adapters/payment';

export const ShoppingCart: FC<ShoppingCartProps> = ({ data, locale }) => {
  const cartStore = useCart();

  const [currency, setCurrency] = useState<number>(0);
  const [liqPayData, setLiqPayData] = useState({
    data: '',
    signature: ''
  });

  const fetchCurrency = useCallback(async () => {
    const response = await getCurrency();
    setCurrency(response);
  }, []);

  const fetchLiqPayData = useCallback(async () => {
    const options = paymentDataAdapter({
      locale,
      currency,
      data: cartStore.cart,
      customer: cartStore.delivery
    });

    const response = await paymentCreate(options);

    setLiqPayData(response);
  }, [currency, cartStore.cart, cartStore.delivery]);

  useEffect(() => {
    fetchCurrency();
  }, []);

  useEffect(() => {
    if (cartStore.key === 'checkout') {
      fetchLiqPayData();
    }
  }, [cartStore.key]);

  const contentZone = {
    cart: <CartList data={data} />,
    delivery: <CartDelivery />,
    checkout: <CartCheckout currency={currency} liqPayData={liqPayData} />,
    success: <Success />
  };

  const handleToggle = () => cartStore.onToggle();

  return (
    <>
      <Button
        onClick={handleToggle}
        className='relative flex cursor-pointer items-center gap-x-2 border-none bg-none text-lg font-medium outline-none'
      >
        {cartStore.cart.length > 0 && <Badge counter={cartStore.cart.length} />}
        <BsFillBagFill className='h-6 w-6 fill-base-200' />
      </Button>

      <Portal selector='portal'>
        <Sidebar position='right' onToggle={handleToggle} opened={cartStore.isOpen}>
          <div className='relative top-16 flex p-5 pt-0'>{contentZone[cartStore.key]}</div>
        </Sidebar>
      </Portal>
    </>
  );
};
