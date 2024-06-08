import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { getStrapiData } from '../strapi';
import { generateStrapiQuery } from '@/lib';
import { revalidatePath } from 'next/cache';

export async function getProductsData({ locale, category }: any) {
  const productsApi = STRAPI_API_ROUTES.getProducts({ locale, category });

  const response = await getStrapiData(
    'products',
    generateStrapiQuery(productsApi)
  );

  revalidatePath(`${locale}/catalog?category=${category}`, 'page');
  return { ...response };
}
