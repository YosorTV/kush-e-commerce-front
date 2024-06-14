import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import { auth } from '@/auth';
import { BaseLayout } from '@/components/layouts';

import { LOCALES } from '@/helpers/constants';

import { LayoutProps } from '@/types/app/layout.types';
import { NextIntlClientProvider } from 'next-intl';
import { getLayoutData } from '@/services';

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

  const { header, footer, shoppingCart } = data;

  return (
    <BaseLayout
      locale={locale}
      header={{ ...header, shoppingCart, session }}
      footer={footer}
    >
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </BaseLayout>
  );
}
