import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';

import { STRAPI_PAGES } from '@/helpers/constants';
import { STRAPI_QUERIES } from '../queries';

interface IGetOrders {
  token: string;
  locale: string;
  userId: string;
}

export const getOrdersData = async ({ locale, userId, token }: IGetOrders): Promise<any> => {
  const orderesQP = generateStrapiQuery(STRAPI_QUERIES.ORDERS({ locale, userId }));

  const response = await getStrapiData(STRAPI_PAGES.orders, orderesQP, { token });
  console.log('response: ', response);

  return { ...response };
};
