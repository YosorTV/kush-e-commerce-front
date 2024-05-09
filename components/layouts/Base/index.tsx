/* eslint-disable @next/next/no-head-element */
import { cn } from '@/lib';

import { montserrat } from '@/assets/fonts';
import { Footer, Header } from '@/components/elements';
import { BaseLayoutProps } from '@/types/components';
import { ShoppingCart } from '@/components/complex/ShoppingCart';
import { Hydrate } from '@/components/simple';

export async function BaseLayout({
  children,
  locale,
  header,
  footer,
  session,
  cart,
}: BaseLayoutProps) {
  return (
    <html lang={locale}>
      <head />
      <body
        className={cn(
          'relative overflow-hidden scroll-auto',
          montserrat.className
        )}
      >
        <Header data={header} session={session} />
        <Hydrate>
          <ShoppingCart data={cart} />
        </Hydrate>
        <main className='z-0 grid h-screen py-14'>{children}</main>
        <Footer {...footer} />
      </body>
    </html>
  );
}
