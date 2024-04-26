/* eslint-disable @next/next/no-head-element */
import { cn } from '@/lib';

import { montserrat } from '@/assets/fonts';
import { Footer, Header } from '@/components/elements';
import { BaseLayoutProps } from '@/types/components';

export async function BaseLayout({
  children,
  header,
  footer,
  session,
}: BaseLayoutProps) {
  return (
    <html lang='en'>
      <head />
      <body
        className={cn(
          'relative overflow-hidden scroll-auto',
          montserrat.className
        )}
      >
        <Header data={header} session={session} />
        <main className='z-0 grid h-screen py-14'>{children}</main>
        <Footer {...footer} />
      </body>
    </html>
  );
}
