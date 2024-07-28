import { formatPrice } from '@/helpers/formatters';
import { cn } from '@/lib';
import { FC } from 'react';

interface IPrice {
  price: number;
  sale?: number;
  locale: string;
  currency: any;
}

export const Price: FC<Readonly<IPrice>> = ({
  price,
  sale = 0,
  locale = 'uk',
  currency,
}) => {
  const discountAmount = price * (sale / 100);
  const originalPrice = formatPrice(price, locale, currency);
  const salePrice = formatPrice(price - discountAmount, locale, currency);

  return (
    <p className='flex gap-x-3'>
      {sale > 0 && <span className='text-2xl text-base-200'>{salePrice}</span>}
      <span
        className={cn(
          sale > 0 ? 'text-xl line-through' : 'text-2xl text-base-200'
        )}
      >
        {originalPrice}
      </span>
    </p>
  );
};
