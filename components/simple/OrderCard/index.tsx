import React, { FC } from 'react';
import { StrapiImage } from '../StrapiImage';
import { cn } from '@/lib';
import { Price } from '../Price';
import { NextLink } from '@/components/elements';
import { formatDate } from '@/helpers/formatters';
import StatusBadge from '../StatusBadge';

interface IOrderCard {
  name: string;
  price: string;
  image: any;
  status: string;
  amount: string;
  id: number;
  quantity: number;
  self_delivery: boolean;
  publishedAt: Date;
  url: string | undefined;
  t: (key: string, options?: Record<string, any>) => string;
}

const getStatus = (stat: string) => {
  switch (stat) {
    case 'sandbox':
      return 'border-purple-600';
    case 'completed':
      return 'border-success';
    case 'error':
      return 'border-error';
    case 'pending':
      return 'border-warning';
    default:
      return 'border-purple-600';
  }
};

const OrderCard: FC<IOrderCard> = ({
  id,
  status,
  quantity,
  price,
  name,
  amount,
  self_delivery,
  publishedAt,
  image,
  url,
  t
}) => {
  return (
    <figure key={id} className={cn('flex min-h-24 w-full items-center justify-between border-l-8', getStatus(status))}>
      <figcaption className='flex gap-20 pr-2.5'>
        <div className='flex flex-col gap-5 px-5'>
          <span>{t('order', { number: id })} </span>
          <span className='whitespace-nowrap'>{t('name', { name })}</span>
          <p>
            {t('status')}&nbsp;
            <StatusBadge status={status} />
          </p>
        </div>

        <div className='flex flex-col gap-5'>
          <span className='whitespace-nowrap'>{t('quantity', { number: quantity })}</span>
          <span className='flex gap-x-2.5'>
            {t('price')} <Price price={parseFloat(price)} currency={1} />
          </span>
          <span className='flex gap-x-2.5'>
            {t('total')} <Price price={parseFloat(amount)} currency={1} />
          </span>
        </div>

        <div className='flex flex-col gap-5'>
          <span>{t('date', { date: formatDate(publishedAt) })}</span>
          <span>
            {t('delivery')}&nbsp;{self_delivery ? t('pickup') : t('novapay')}
          </span>
          <NextLink href={url} className='link-hover whitespace-nowrap underline-offset-8'>
            {t('link')}
          </NextLink>
        </div>
      </figcaption>
      <NextLink href={url} className='h-24 w-24' title={name}>
        <StrapiImage
          src={image.url}
          width={image.width}
          sizes='100vw'
          alt={image.alt}
          height={image.height}
          className='aspect-square h-full w-full transform-gpu rounded-md object-cover transition-all duration-300 hover:scale-105'
        />
      </NextLink>
    </figure>
  );
};

export default OrderCard;
