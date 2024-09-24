import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';

import { STRAPI_PAGES } from '@/helpers/constants';
import { STRAPI_QUERIES } from '../queries';

interface IGetOrders {
  token: string;
  locale: string;
  email: string;
}

export const getOrdersData = async ({ locale, email, token }: IGetOrders): Promise<any> => {
  const orderesQP = generateStrapiQuery(STRAPI_QUERIES.ORDERS({ locale, email }));

  const response = await getStrapiData(STRAPI_PAGES.orders, orderesQP, { token, next: { tags: ['orders'] } });
  console.log('response: ', response);

  return { ...response };
};
