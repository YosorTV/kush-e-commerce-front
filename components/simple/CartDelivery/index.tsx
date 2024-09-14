'use client';

import { useState } from 'react';
import { NovaPostOptions } from '@/components/simple/NovaPostOptions';
import { Button, Input, Title } from '@/components/elements';
import { useCart } from '@/store';

export const CartDelivery = ({ title = 'Оберіть спосіб доставки' }) => {
  const [self, setSelf] = useState(false);

  const cartStore = useCart();

  const handleBack = () => cartStore.setForm('cart');

  return (
    <div className='form-control w-full'>
      <Button onClick={handleBack} className='btn btn-link justify-start px-0 text-lg normal-case'>
        Повернутись
      </Button>
      <div className='form-control gap-y-5 pt-5'>
        <Title level='3' className='w-full self-center pb-5 text-center text-2xl font-light'>
          {title}
        </Title>
        <Input
          id='self'
          type='checkbox'
          checked={self}
          label='Забрати самостійно'
          onChange={() => setSelf(!self)}
          className='checkbox checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-lg cursor-pointer'
          containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
        />
        <div className='divider' />
        <div className='form-control gap-y-5'>
          <Title level='3'>Доставити за допомогою нової пошти</Title>
          <NovaPostOptions
            warehouseOptions={{ label: null, value: null }}
            cityOptions={{ label: null, value: null }}
            disabled={self}
          />
        </div>
        <div className='divider' />
        <button onClick={() => cartStore.setForm('checkout')} className='btn btn-primary w-full text-base-100'>
          Перейти до оплати
        </button>
      </div>
    </div>
  );
};
