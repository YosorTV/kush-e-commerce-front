import { montserrat } from '@/assets/fonts';
import { ClientSideRender } from '@/components/complex';
import Modal from '@/components/complex/Modal';
import { Footer } from '@/components/elements';
import Header from '@/components/elements/Header';
import { AutoLogoutProvider } from '@/components/providers';

import { WishlistNotification } from '@/components/simple/WishlistNotification';
import { cn } from '@/lib';
import { getLayoutData } from '@/services';
import { BaseLayoutProps } from '@/types/components';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { PropsWithChildren } from 'react';

export default async function BaseLayout({ children, locale }: PropsWithChildren<BaseLayoutProps>) {
  const { header, footer, shoppingCart } = await getLayoutData({ locale });

  return (
    <html lang={locale} suppressHydrationWarning className={cn(montserrat.className, 'scroll-smooth')}>
      <body className='relative grid overflow-x-clip'>
        <Header data={header} shoppingCart={shoppingCart} locale={locale} />
        <ThemeProvider>
          <AutoLogoutProvider>
            <main className='flex min-h-dvh flex-grow flex-col'>{children}</main>
            <div id='portal' />
            <ClientSideRender />
            <Modal id='my_modal_3'>
              <WishlistNotification locale={locale} />
            </Modal>
          </AutoLogoutProvider>
        </ThemeProvider>
        <Footer data={footer} locale={locale} />
        <Script src='//static.liqpay.ua/libjs/checkout.js' strategy='lazyOnload' async />
      </body>
    </html>
  );
}
