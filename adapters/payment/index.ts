import { v4 as uuidv4 } from 'uuid';

import { formatPrice, formatTotalAmount } from '@/helpers/formatters';

import { CartItemType } from '@/types/store';

interface IPaymentAdapter {
  data: CartItemType[];
  locale: string;
  currency: number;
}

interface ILiqPayAdapter {
  data: string;
  signature: string;
}

export const paymentDataAdapter = ({ data, locale, currency }: IPaymentAdapter) => {
  const { totalPrice } = formatTotalAmount(data);

  const order_id = `order_${uuidv4()}`;
  const description = data.map((item: CartItemType) => item.name).join(',');
  const totalAmout = parseFloat(formatPrice(totalPrice, locale, currency).replace(/[^\d.,-]/g, ''));

  const products = data.map((item: CartItemType) => ({
    name: item.name,
    quantity: item.quantity,
    price: formatPrice(item.unit_amount, locale, currency).replace(/[^\d.,-]/g, '')
  }));

  return {
    amount: totalAmout,
    shop_name: 'KUSH | JEWERLY',
    currency: locale === 'uk' ? 'UAH' : 'USD',
    description: `Оплата ювелірних прикрас: ${description}`,
    order_id,
    rro_info: {
      items: products,
      delivery_emails: ['yosorit@gmail.com'],
      total_amount: totalAmout,
      cashier: 'John Doe'
    },
    products: products,
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+380501234567'
    }
  };
};

export const liqPayAdapter = ({ data, signature }: ILiqPayAdapter) => {
  if (!data || !signature) return null;

  return {
    data,
    signature,
    embedTo: '#liqpay_checkout',
    mode: 'embed'
  };
};
