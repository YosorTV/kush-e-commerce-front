import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import { auth } from '@/auth';
import { BaseLayout } from '@/components/layouts';

import { LOCALES } from '@/helpers/constants';

import { LayoutProps } from '@/types/app/layout.types';
import { NextIntlClientProvider } from 'next-intl';
import { getLayoutData } from '@/services';
import { AutoLogoutProvider } from '@/components/providers';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocalLayout({
  children,
  params: { locale },
}: Readonly<LayoutProps>) {
  unstable_setRequestLocale(locale);

  const data = await getLayoutData({ locale });
  const messages = await getMessages();
  const session = await auth();

  const { header: headerData, footer, shoppingCart } = data;

  const header = { ...headerData, shoppingCart, session };

  return (
    <BaseLayout locale={locale} header={header} footer={footer}>
      <NextIntlClientProvider messages={messages}>
        <AutoLogoutProvider session={session ? session : null}>
          {children}
        </AutoLogoutProvider>
      </NextIntlClientProvider>
    </BaseLayout>
  );
}
