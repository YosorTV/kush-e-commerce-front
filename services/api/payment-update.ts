'use server';

import { revalidateTag } from 'next/cache';
import { postStrapiData } from '../strapi';

interface IPayment {
  data: string;
  signature: string;
  products: any[];
  customer: any;
  userId: number;
}

export const paymentCallback = async (data: IPayment) => {
  const response = await postStrapiData('payment/callback', data);

  revalidateTag('orders');

  return response;
};
