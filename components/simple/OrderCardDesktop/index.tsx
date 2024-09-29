import React, { FC } from 'react';
import { StrapiImage } from '../StrapiImage';
import { cn, getStatusBorder } from '@/lib';
import { Price } from '../Price';
import { NextLink } from '@/components/elements';
import { formatDate } from '@/helpers/formatters';
import StatusBadge from '../StatusBadge';
import { IOrderCard } from '@/types/components';

export const OrderCardDesktop: FC<IOrderCard> = ({
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
    <figure
      key={id}
      className={cn('flex min-h-24 w-full items-center justify-between border-l-8', getStatusBorder(status))}
    >
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
      <NextLink href={url} className='h-32 w-32' title={name}>
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
