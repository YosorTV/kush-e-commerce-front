import { STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export const getDeliveryData = async ({ locale }: { locale: string }) => {
  const deliveryApi = STRAPI_QUERIES.DELIVERY({ locale });

  const response = await getStrapiData(STRAPI_ENTRIES.delivery, generateStrapiQuery(deliveryApi));

  return { data: response };
};
