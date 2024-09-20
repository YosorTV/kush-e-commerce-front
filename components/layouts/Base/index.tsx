import { montserrat } from '@/assets/fonts';
import { Footer, Header } from '@/components/elements';
import { ThemeProvider } from '@/components/providers';
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
          <Footer data={footer} locale={locale} />
          <div id='portal' />
        </ThemeProvider>
      </body>
      <Script src='//static.liqpay.ua/libjs/checkout.js' strategy='lazyOnload' async />
    </html>
  );
}
