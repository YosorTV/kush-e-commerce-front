import { cn } from '@/lib';

import { montserrat } from '@/assets/fonts';
import { Footer, Header } from '@/components/elements';
import { BaseLayoutProps } from '@/types/components';

export async function BaseLayout({
  children,
  locale,
  header,
  footer,
  session,
}: BaseLayoutProps) {
  return (
    <html lang={locale}>
      <body
        className={cn(
          'relative overflow-hidden scroll-auto',
          montserrat.className
        )}
      >
        <Header data={header} session={{ ...session, locale }} />
        <main className='z-0 grid h-screen py-14'>{children}</main>
        <Footer {...footer} />
        <div id='portal' />
      </body>
    </html>
  );
}
