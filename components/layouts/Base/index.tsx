import { cn } from '@/lib';

import { roboto } from '@/assets/fonts';
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
      <body className={cn('relative h-full overflow-hidden', roboto.className)}>
        <Header data={header} session={session} />
        <main className='grid min-h-screen py-16'>{children}</main>
        <Footer {...footer} />
      </body>
    </html>
  );
}
