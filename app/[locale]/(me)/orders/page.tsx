import { Metadata } from 'next';

import { STRAPI_PAGES } from '@/helpers/constants';
import { getMetadata, getOrdersData } from '@/services';
import { PageProps } from '@/types/app/page.types';
import { auth } from '@/auth';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.profile, locale });

  return response;
}

export default async function OrdersPage({ params }: PageProps) {
  const { locale } = params;

  const session = await auth();

  const { data } = await getOrdersData({ locale, userId: session.user.id, token: session?.accessToken });
  console.log('data: ', data);

  return <section className='flex w-full flex-col justify-center bg-info-content'>Orders</section>;
}
