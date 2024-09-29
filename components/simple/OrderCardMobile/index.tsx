import React, { FC } from 'react';

import { IOrderCard } from '@/types/components';
import { StrapiImage } from '../StrapiImage';
import StatusBadge from '../StatusBadge';
import { cn, getStatusBorder } from '@/lib';
import { formatDate } from '@/helpers/formatters';
import { Price } from '../Price';
import { NextLink } from '@/components/elements';

export const OrderCardMobile: FC<IOrderCard> = ({
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
    <div className={cn('group card image-full h-96 w-96 overflow-hidden border-2', getStatusBorder(status))}>
      <figure className='overflow-hidden rounded-md'>
        <StrapiImage
          src={image.url}
          width={image.width}
          sizes='100vw'
          alt={image.alt}
          height={image.height}
          className='aspect-square h-full w-full transform-gpu object-cover transition-all duration-300 group-hover:scale-105'
        />
      </figure>
      <div className='card-body gap-y-5 rounded-md font-semibold !text-white'>
        <div className='grid grid-cols-1'>
          <div className='flex flex-col gap-2.5'>
            <span className=''>{t('order', { number: id })}</span>
            <p>
              {t('status')}&nbsp;
              <StatusBadge status={status} />
            </p>
            <span className='whitespace-nowrap'>{t('name', { name })}</span>
            <span className='whitespace-nowrap'>{t('quantity', { number: quantity })}</span>
            <span className='flex gap-x-2.5 whitespace-nowrap'>
              {t('price')} <Price price={parseFloat(price)} currency={1} />
            </span>
            <span className='flex gap-x-2.5 whitespace-nowrap'>
              {t('total')} <Price price={parseFloat(amount)} currency={1} />
            </span>
            <span>{t('date', { date: formatDate(publishedAt) })}</span>
            <span>
              {t('delivery')}&nbsp;{self_delivery ? t('pickup') : t('novapay')}
            </span>
          </div>
        </div>

        <div className='card-actions mt-auto w-full'>
          <NextLink href={url} className='link-hover btn-primary w-full underline-offset-8'>
            {t('link')}
          </NextLink>
        </div>
      </div>
    </div>
  );
};
