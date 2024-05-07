import { auth } from '@/auth';
import { BaseLayout } from '@/components/layouts';
import { getStrapiData } from '@/services/strapi';
import { generateStrapiQuery } from '@/lib/qs';
import { STRAPI_API_ROUTES } from '@/helpers/constants';

import { LayoutProps } from '@/types/app/layout.types';

import './globals.css';

export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  const globalQP = generateStrapiQuery(
    STRAPI_API_ROUTES.global({ locale: 'en' })
  );

  const data = await getStrapiData('global', globalQP);

  const session = await auth();

  return (
    <BaseLayout
      header={data?.header}
      footer={data?.footer}
      cart={data?.shoppingCart}
      session={session}
    >
      {children}
    </BaseLayout>
  );
}
