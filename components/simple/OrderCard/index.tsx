import React, { FC } from 'react';
import { StrapiImage } from '../StrapiImage';
import { cn } from '@/lib';

interface IOrderCard {
  name: string;
  price: string;
  image: any;
  status: string;
  amount: string;
  id: number;
  quantity: number;
  self_delivery: boolean;
  publishedAt: string;
}

const getStatus = (stat: string) => {
  switch (stat) {
    case 'sandbox':
    case 'completed':
      return 'border-success';
    case 'error':
      return 'border-error';
    case 'pending':
      return 'border-warning';
    default:
      return 'border-success';
  }
};

const OrderCard: FC<IOrderCard> = ({ id, status, quantity, price, image }) => {
  return (
    <figure
      key={id}
      className='flex min-h-32 w-full items-center justify-between border-b border-b-gray-400 pb-2.5 pr-5'
    >
      <div className='flex gap-5'>
        <div className={cn('flex flex-col gap-5 border-l-8 px-5', getStatus(status))}>
          <span>№ {id}</span>
          <p>Cтатус: {status}</p>
        </div>

        <div className='flex flex-col gap-5'>
          <span>кількість: {quantity}</span>
          <p>Ціна: {price}</p>
        </div>
      </div>

      <div className='h-28 w-28'>
        <StrapiImage
          src={image.url}
          width={image.width}
          sizes='100vw'
          alt={image.alt}
          height={image.height}
          className='aspect-square h-full w-full object-cover'
        />
      </div>
    </figure>
  );
};

export default OrderCard;
