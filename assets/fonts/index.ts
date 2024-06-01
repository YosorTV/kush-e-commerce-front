import { Roboto, Montserrat, Cormorant } from 'next/font/google';

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  adjustFontFallback: false,
});

export const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  adjustFontFallback: false,
});

export const cormorant = Cormorant({
  weight: ['500', '700', '300'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  adjustFontFallback: false,
});
