import { montserrat } from '@/assets/fonts';
import { ClientSideRender } from '@/components/complex';
import Modal from '@/components/complex/Modal';
import { Footer, Header } from '@/components/elements';
import { ThemeProvider } from '@/components/providers';
import { WishlistNotification } from '@/components/simple/WishlistNotification';
import { cn } from '@/lib';
import { BaseLayoutProps } from '@/types/components';
import Script from 'next/script';

export async function BaseLayout({ children, locale, header, footer }: BaseLayoutProps) {
  return (
    <html lang={locale} suppressHydrationWarning className={cn(montserrat.className, 'scroll-smooth')}>
      <body className='relative grid overflow-x-clip'>
        <ThemeProvider>
          <Header data={header} locale={locale} />
          <main className='flex min-h-dvh flex-grow flex-col'>{children}</main>
          <ClientSideRender />
          <div id='portal' />
          <Modal id='my_modal_3'>
            <WishlistNotification locale={locale} />
          </Modal>
          <Footer data={footer} locale={locale} />
          <Script src='//static.liqpay.ua/libjs/checkout.js' strategy='afterInteractive' async />
        </ThemeProvider>
      </body>
    </html>
  );
}
