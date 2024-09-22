import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import { LOCALES } from '@/helpers/constants';

import { LayoutProps } from '@/types/app/layout.types';

import BaseLayout from '@/components/layouts/Base';

import { getLayoutData } from '@/services';
import { auth } from '@/auth';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = params;

  unstable_setRequestLocale(locale);

  const session = await auth();
  const messages = await getMessages();
  const data = await getLayoutData({ locale });

  const { header, footer, shoppingCart } = data;

  return (
    <BaseLayout
      locale={locale}
      header={header}
      footer={footer}
      session={session}
      messages={messages}
      cart={shoppingCart}
    >
      {children}
    </BaseLayout>
  );
}
