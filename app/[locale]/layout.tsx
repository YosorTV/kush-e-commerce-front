import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import { auth } from '@/auth';
import { BaseLayout } from '@/components/layouts';

import { LOCALES } from '@/helpers/constants';

import { LayoutProps } from '@/types/app/layout.types';
import { NextIntlClientProvider } from 'next-intl';
import { getLayoutData } from '@/services';
import { AutoLogoutProvider } from '@/components/providers';
import Modal from '@/components/complex/Modal';
import { WishlistNotification } from '@/components/simple/WishlistNotification';
import { SessionProvider } from 'next-auth/react';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocalLayout({ children, params: { locale } }: Readonly<LayoutProps>) {
  unstable_setRequestLocale(locale);

  const { header: headerData, footer, shoppingCart } = await getLayoutData({ locale });

  const messages = await getMessages();
  const session = await auth();

  return (
    <NextIntlClientProvider messages={messages}>
      <SessionProvider session={session}>
        <AutoLogoutProvider>
          <BaseLayout locale={locale} header={{ ...headerData, shoppingCart }} footer={footer}>
            {children}
            <Modal id='my_modal_3'>
              <WishlistNotification locale={locale} />
            </Modal>
          </BaseLayout>
        </AutoLogoutProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
