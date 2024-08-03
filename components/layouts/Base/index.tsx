import { montserrat } from '@/assets/fonts';
import { ClientSideRender } from '@/components/complex';
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
      <body className='relative grid overflow-x-clip'>
        <ThemeProvider>
          <Header data={header} locale={locale} />
          <main className='flex flex-grow flex-col overflow-hidden'>
            {children}
          </main>
          <Footer data={footer} locale={locale} />
          <div id='portal' />
          <ClientSideRender />
        </ThemeProvider>
      </body>
    </html>
  );
}
