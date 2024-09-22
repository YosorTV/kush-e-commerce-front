import { montserrat } from '@/assets/fonts';
import { ClientSideRender } from '@/components/complex';
import Modal from '@/components/complex/Modal';
import { Footer } from '@/components/elements';
import Header from '@/components/elements/Header';
import { AutoLogoutProvider, ThemeProvider } from '@/components/providers';

import { WishlistNotification } from '@/components/simple/WishlistNotification';
import { cn } from '@/lib';
import { BaseLayoutProps } from '@/types/components';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';

import Script from 'next/script';
import { PropsWithChildren } from 'react';

export default async function BaseLayout({
  children,
  locale,
  header,
  footer,
  session,
  messages,
  cart
}: PropsWithChildren<BaseLayoutProps>) {
  return (
    <html lang={locale} suppressHydrationWarning className={cn(montserrat.className, 'scroll-smooth')}>
      <body className='relative grid overflow-x-clip'>
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <AutoLogoutProvider>
              <ThemeProvider>
                <Header data={header} shoppingCart={cart} locale={locale} session={session} />
                <main className='flex min-h-dvh flex-grow flex-col'>{children}</main>
                <div id='portal' />
                <ClientSideRender />
                <Modal id='my_modal_3'>
                  <WishlistNotification locale={locale} />
                </Modal>
                <Footer data={footer} locale={locale} />
              </ThemeProvider>
            </AutoLogoutProvider>
          </NextIntlClientProvider>
        </SessionProvider>
        <Script src='//static.liqpay.ua/libjs/checkout.js' strategy='lazyOnload' async />
      </body>
    </html>
  );
}
