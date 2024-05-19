import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import { auth } from '@/auth';
import { BaseLayout } from '@/components/layouts';
import { ClientSideRender } from '@/components/complex';

import { getStrapiData } from '@/services/strapi';
import { generateStrapiQuery } from '@/lib/qs';
import { LOCALES, STRAPI_API_ROUTES } from '@/helpers/constants';

import { LayoutProps } from '@/types/app/layout.types';
import { NextIntlClientProvider } from 'next-intl';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocalLayout({
  children,
  params: { locale },
}: Readonly<LayoutProps>) {
  unstable_setRequestLocale(locale);

  const globalQP = generateStrapiQuery(STRAPI_API_ROUTES.global({ locale }));

  const { header, footer, shoppingCart } = await getStrapiData(
    'global',
    globalQP
  );

  const session = await auth();

  const messages = await getMessages();

  return (
    <BaseLayout
      locale={locale}
      header={header}
      footer={footer}
      session={session}
    >
      <NextIntlClientProvider messages={messages}>
        {children}
        <ClientSideRender data={shoppingCart} session={session} />
      </NextIntlClientProvider>
    </BaseLayout>
  );
}
