import { montserrat } from '@/assets/fonts';
import { Footer, Header } from '@/components/elements';
import { ThemeProvider } from '@/components/providers';
import { BaseLayoutProps } from '@/types/components';

export async function BaseLayout({
  children,
  locale,
  header,
  footer,
}: BaseLayoutProps) {
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={montserrat.className}
    >
      <body className='relative grid'>
        <ThemeProvider>
          <Header data={{ ...header, locale }} />
          <main className='z-0'>{children}</main>
          <Footer {...footer} />
          <div id='portal' />
        </ThemeProvider>
      </body>
    </html>
  );
}
