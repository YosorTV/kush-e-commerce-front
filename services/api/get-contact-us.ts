import { generateStrapiQuery } from '@/lib';

import { getStrapiData } from '@/services/strapi';
import { STRAPI_QUERIES } from '@/services/queries';

import { STRAPI_PAGES } from '@/helpers/constants';

export async function getContactUsData({ locale }: { locale: string }) {
  const contactUsApi = STRAPI_QUERIES.CONTACT_US({ locale });

  const response = await getStrapiData(STRAPI_PAGES.contacts, generateStrapiQuery(contactUsApi));

  return { data: response };
}

export async function getContactUsBlock({ locale }: { locale: string }) {
  const contactUsApi = STRAPI_QUERIES.CONTACT_US_BLOCK({ locale });

  const response = await getStrapiData(STRAPI_PAGES.contacts, generateStrapiQuery(contactUsApi));

  return { data: response };
}
