import { FC } from 'react';

import { NextLink } from '@/components/elements';
import { formatDate } from '@/helpers/formatters';
import { IOrderCard } from '@/types/components';
import { Price } from '../Price';
import StatusBadge from '../StatusBadge';
import { StrapiImage } from '../StrapiImage';

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
    <div className='group card image-full h-80 w-full overflow-hidden rounded-none border-2 border-base-100'>
      <figure className='overflow-hidden !rounded-none'>
        <StrapiImage
          src={image.url}
          width={image.width}
          sizes='100vw'
          alt={image.alt}
          height={image.height}
          className='aspect-square h-full w-full transform-gpu object-cover transition-all duration-300 group-hover:scale-105'
        />
      </figure>
      <div className='card-body gap-y-5 !rounded-none font-medium !text-white'>
        <div className='grid grid-cols-1'>
          <div className='flex flex-col gap-2.5'>
            <p className='pb-4'>
              {t('status')}&nbsp;
              <StatusBadge status={status} />
            </p>
            <span className='whitespace-nowrap'>{t('name', { name })}</span>
            <span className='whitespace-nowrap'>{t('quantity', { number: quantity })}</span>
            <span className='flex items-baseline gap-x-2.5 whitespace-nowrap'>
              {t('price')} <Price price={parseFloat(price)} currency={1} className='text-xs' />
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
