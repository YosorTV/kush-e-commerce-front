import { postStrapiData } from '../strapi';

interface IPayment {
  amount: number;
  currency: string;
  description: string;
  order_id: string;
}

export const paymentCreate = async (data: IPayment) => {
  const response = await postStrapiData('payment/create', data);

  return response;
};
