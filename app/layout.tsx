import { auth } from '@/auth';
import { BaseLayout } from '@/components/layouts';
import { getStrapiData } from '@/services/strapi';
import { generateStrapiQuery } from '@/lib/qs';
import { STRAPI_API_ROUTES } from '@/helpers/constants';

import './globals.css';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalQP = generateStrapiQuery(STRAPI_API_ROUTES.global);

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
