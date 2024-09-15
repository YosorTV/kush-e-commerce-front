import { postStrapiData } from '../strapi';

interface IPayment {
  data: string;
  signature: string;
}

export const paymentCallback = async (data: IPayment) => {
  const response = await postStrapiData('payment/callback', data);

  return response;
};
