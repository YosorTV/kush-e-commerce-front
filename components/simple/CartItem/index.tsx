'use client';

import { FC } from 'react';

import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import { CartItemProps } from '@/types/components';
import { StrapiImage } from '../StrapiImage';
import { Title } from '@/components/elements';
import { formatPrice } from '@/helpers/formatters';
import { useLocale } from 'next-intl';

export const CartItem: FC<CartItemProps> = ({ data, currency, onAdd, onRemove }) => {
  const locale = useLocale();

  return (
    <>
      <StrapiImage
        src={data?.images?.url}
        alt={data?.images?.alternativeText}
        formats={data?.images?.formats}
        loading='lazy'
        width={320}
        height={320}
        className='h-full rounded-md object-cover'
        containerClass='w-20'
      />
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <Title level='2' className='text-lg font-semibold'>
            {data?.name}
          </Title>
          <div className='flex h-min items-center gap-x-2'>
            <p className='text-md font-semibold'>Quantity: {data?.quantity}</p>
            <div className='flex items-center gap-x-1.5'>
              <button className='btn-circle h-min w-auto' onClick={onRemove}>
                <IoRemoveCircle height={6} width={6} />
              </button>
              <button className='btn-circle h-min w-auto' onClick={onAdd}>
                <IoAddCircle height={6} width={6} />
              </button>
            </div>
          </div>
        </div>
        <p className='text-sm font-semibold capitalize'>
          {data?.price}: <span>{formatPrice(data?.unit_amount, locale, currency)}</span>
        </p>
      </div>
    </>
  );
};
