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
    <figure key={id} className={cn('flex min-h-24 w-full items-center justify-between border-l-8', getStatus(status))}>
      <figcaption className='flex gap-5 pr-2.5'>
        <div className='flex flex-col gap-5 px-5'>
          <span>№ {id}</span>
          <p className=''>Cтатус: {status}</p>
        </div>

        <div className='flex flex-1 flex-col gap-5'>
          <span className='whitespace-nowrap'>кількість: {quantity}</span>
          <p>Ціна: {price}</p>
        </div>
      </figcaption>
      <div className='h-24 w-24'>
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
