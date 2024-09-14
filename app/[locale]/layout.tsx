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

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocalLayout({ children, params: { locale } }: Readonly<LayoutProps>) {
  unstable_setRequestLocale(locale);

  const { header: headerData, footer, shoppingCart } = await getLayoutData({ locale });

  const messages = await getMessages();
  const session = await auth();

  return (
    <BaseLayout locale={locale} header={{ ...headerData, shoppingCart }} footer={footer}>
      <NextIntlClientProvider messages={messages}>
        <AutoLogoutProvider session={session ? session : null}>{children}</AutoLogoutProvider>
        <Modal id='my_modal_3'>
          <WishlistNotification locale={locale} />
        </Modal>
      </NextIntlClientProvider>
    </BaseLayout>
  );
}
