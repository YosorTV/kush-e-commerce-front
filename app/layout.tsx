import { auth } from '@/auth';
import { BaseLayout } from '@/components/layouts';
import { getStrapiData } from '@/services/strapi';
import { generateStrapiQuery } from '@/lib/qs';
import { STRAPI_API_ROUTES } from '@/helpers/constants';

import './globals.css';

const layoutQP = generateStrapiQuery(STRAPI_API_ROUTES.global);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getStrapiData('global', layoutQP);
  const session = await auth();

  return (
    <BaseLayout header={data?.header} footer={data?.footer} session={session}>
      {children}
    </BaseLayout>
  );
}
