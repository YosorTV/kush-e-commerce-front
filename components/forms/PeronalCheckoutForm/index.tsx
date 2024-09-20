'use client';

import { Input, Title } from '@/components/elements';
import { useCart } from '@/store';
import { IDeliveryForm } from '@/types/store';
import { Session } from 'next-auth';
import { useLocale } from 'next-intl';
import { FC } from 'react';

interface IPersonalCheckoutForm {
  data: Session['data'];
  title: string;
}

export const PeronalCheckoutForm: FC<IPersonalCheckoutForm> = ({ data, title = 'Особисті дані' }) => {
  const cartStore = useCart();
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    cartStore.setDelivery(name as keyof IDeliveryForm, value);
  };

  return (
    <div className='form-control gap-y-5'>
      <Title level='4' className='w-full self-center text-center text-2xl font-light'>
        1.{title}
      </Title>
      <form className='form-control gap-y-5'>
        <Input
          id='name'
          name='firstName'
          label={locale === 'uk' ? "Ім'я" : 'Name'}
          defaultValue={data && data?.firstName}
          onChange={handleChange}
          className='input checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
        />
        <Input
          id='lastName'
          name='lastName'
          defaultValue={data && data?.lastName}
          label={locale === 'uk' ? 'Прізвисько' : 'Last name'}
          onChange={handleChange}
          className='input checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
        />
        <Input
          id='email'
          name='email'
          defaultValue={data && data?.email}
          label={locale === 'uk' ? 'Пошта' : 'Email'}
          onChange={handleChange}
          className='input checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
        />
        <Input
          id='phone'
          autoComplete='off'
          value={data && data?.phoneNumber}
          type='tel'
          name='phone'
          onChange={(v) => cartStore.setDelivery('phone', String(v))}
          label={locale === 'uk' ? 'Номер телефону' : 'Phone number'}
          className='input checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
        />
      </form>
    </div>
  );
};
