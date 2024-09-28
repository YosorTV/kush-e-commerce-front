import { formatPrice } from '@/helpers/formatters';
import { cn } from '@/lib';
import { FC } from 'react';

interface IPrice {
  price: number;
  sale?: number;
  currency: any;
  className?: string;
}

export const Price: FC<Readonly<IPrice>> = ({ price = 0, sale = 0, currency, className }) => {
  const discountAmount = price * (sale / 100);
  const originalPrice = formatPrice(price, currency);

  const salePrice = formatPrice(price - discountAmount, currency);

  return (
    <p aria-label={`Price: ${price}`} className={cn('flex flex-col-reverse items-end gap-x-3 xs:flex-row', className)}>
      {sale > 0 && <span className='text-base text-base-200'>{salePrice}</span>}
      <span className={cn('text-base', sale > 0 && 'line-through')}>{originalPrice}</span>
    </p>
  );
};
