import { IExchangeRate } from '@/types/helpers/currency.types';
import { getStrapiData } from '../strapi';

export const getCurrency = async () => {
  const response = await getStrapiData('currency-change');

  const usdToUahRate = response.find(
    (rate: IExchangeRate) => rate.ccy === 'USD' && rate.base_ccy === 'UAH'
  ).sale;

  return Number(usdToUahRate);
};
