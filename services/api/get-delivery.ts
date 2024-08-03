import { STRAPI_PAGES } from '@/helpers/constants';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';

export const getDeliveryData = async ({ locale }: { locale: string }) => {
  const deliveryApi = STRAPI_QUERIES.DELIVERY({ locale });

  const response = await getStrapiData(
    STRAPI_PAGES.delivery,
    generateStrapiQuery(deliveryApi)
  );

  return { data: response };
};
