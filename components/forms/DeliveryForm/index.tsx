'use client';

import { FC, useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';

import { useCart } from '@/store';

import { Input, Title } from '@/components/elements';
import { NovaPostOptions } from '@/components/simple/NovaPostOptions';

interface IDeliveryForm {
  data: Session['data'];
  title: string;
}

export const DeliveryForm: FC<IDeliveryForm> = ({ data, title = 'Спосіб доставки' }) => {
  const cartStore = useCart();

  const [self, setSelf] = useState(false);
  const [withNp, setWithNp] = useState(false);

  const handleSelf = () => {
    setSelf(!self);

    cartStore.setDelivery('self', self);
  };

  const t = useTranslations('cart');

  useEffect(() => {
    if (self) {
      cartStore.setDelivery('novapostCity', null);
      cartStore.setDelivery('novapostWarehouse', null);
    }
  }, [self]);

  return (
    <form className='form-control gap-y-5'>
      <Title level='4' className='w-full self-center text-center text-2xl font-light'>
        2.{title}
      </Title>
      <div className='divider my-0' />
      <div className='flex flex-col gap-y-5 sm:flex-row sm:justify-between'>
        <Input
          id='self'
          disabled={withNp}
          type='checkbox'
          checked={self}
          label={t('self')}
          onChange={handleSelf}
          className='checkbox checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
          containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
        />

        <Input
          id='np'
          type='checkbox'
          disabled={self}
          checked={withNp}
          label={t('novapost')}
          onChange={() => setWithNp(!withNp)}
          className='checkbox checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
          containerClass='flex-row flex-row-reverse justify-end sm:justify-start items-center gap-x-3'
        />
      </div>
      {withNp && (
        <>
          <div className='divider my-0' />
          <div className='form-control gap-y-5'>
            <Title level='4'>{t('delivery_spot')}</Title>
            <NovaPostOptions
              warehouseOptions={null}
              cityOptions={null}
              onCityChange={(city) => cartStore.setDelivery('novapostCity', city)}
              onWarehouseChange={(warehouse) => cartStore.setDelivery('novapostWarehouse', warehouse)}
            />
          </div>
        </>
      )}
    </form>
  );
};
