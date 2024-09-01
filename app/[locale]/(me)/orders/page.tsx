import { Metadata } from 'next';

import { STRAPI_PAGES } from '@/helpers/constants';
import { getMetadata } from '@/services';
import { PageProps } from '@/types/app/page.types';
// import { auth } from '@/auth';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.profile, locale });

  return response;
}

export default async function OrdersPage({ params }: PageProps) {
  // const { locale } = params;

  // const { accessToken } = await auth();

  return <section>Orders</section>;
}
