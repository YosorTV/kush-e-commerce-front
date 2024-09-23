import { LOCALES } from '@/helpers/constants';
import { PropsWithChildren } from 'react';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function RootLayout({ children }: PropsWithChildren) {
  return children;
}
