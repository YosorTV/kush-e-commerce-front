import { postStrapiData } from '../strapi';

export const getIntentId = async (data: any) => {
  const response = await postStrapiData('orders', data);

  return response;
};
