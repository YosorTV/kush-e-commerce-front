'use client';

import { FC } from 'react';

import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import { CartItemProps } from '@/types/components';
import { StrapiImage } from '../StrapiImage';
import { Title } from '@/components/elements';
import { formatPrice } from '@/helpers/formatters';

export const CartItem: FC<CartItemProps> = ({ data, onAdd, onRemove }) => {
  return (
    <>
      <StrapiImage
        src={data.image.url}
        alt={data.image.alternativeText}
        width={600}
        height={600}
        className='w-20 rounded-md'
      />
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <Title level='2' className='text-lg font-semibold'>
            {data.name}
          </Title>
          <div className='flex items-center gap-x-2'>
            <p className='text-md font-semibold'>Quantity: {data.quantity}</p>
            <div className='flex items-center gap-x-1.5'>
              <button className='btn-circle w-auto' onClick={onRemove}>
                <IoRemoveCircle />
              </button>
              <button className='btn-circle w-auto' onClick={onAdd}>
                <IoAddCircle />
              </button>
            </div>
          </div>
        </div>
        <p className='text-sm font-semibold capitalize'>
          {data.price}: <span>{formatPrice(data.unit_amount)}</span>
        </p>
      </div>
    </>
  );
};
