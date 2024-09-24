'use client';

import { FC, useMemo } from 'react';

import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import { CartItemProps } from '@/types/components';
import { StrapiImage } from '../StrapiImage';
import { Title } from '@/components/elements';
import { formatPrice } from '@/helpers/formatters';
import { useLocale } from 'next-intl';

export const CartItem: FC<CartItemProps> = ({ data, currency, onAdd, onRemove }) => {
  const locale = useLocale();

  const quantityTitle = useMemo(() => {
    return locale === 'uk' ? 'Кількість:' : 'Quantity:';
  }, [locale]);

  const priceTitle = useMemo(() => {
    return locale === 'uk' ? 'Ціна за одиницю:' : 'Price for item:';
  }, [locale]);

  const sizeTitle = useMemo(() => {
    return locale === 'uk' ? 'Розмір:' : 'Size:';
  }, [locale]);

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
        containerClass='w-24'
      />
      <div className='flex flex-col'>
        <div className='flex flex-col gap-y-2.5'>
          <Title level='2' className='text-lg font-semibold'>
            {data?.name}
          </Title>
          <div className='flex h-min items-center gap-x-2'>
            <p className='text-sm font-medium normal-case text-base-200'>
              {quantityTitle}&nbsp;{data?.quantity}
            </p>
            <div className='flex items-center gap-x-1.5'>
              <button className='btn-circle h-min w-auto' onClick={onRemove}>
                <IoRemoveCircle height={6} width={6} />
              </button>
              <button className='btn-circle h-min w-auto' onClick={onAdd}>
                <IoAddCircle height={6} width={6} />
              </button>
            </div>
          </div>
          <p className='text-sm font-medium normal-case text-base-200'>
            {sizeTitle}&nbsp;{data?.size}
          </p>
          <p className='text-sm font-medium normal-case text-base-200'>
            {priceTitle}&nbsp;{formatPrice(data?.unit_amount, currency)}
          </p>
        </div>
      </div>
    </>
  );
};
