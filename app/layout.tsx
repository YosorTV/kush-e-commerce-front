import { PropsWithChildren } from 'react';

import { LOCALES } from '@/helpers/constants';

import './globals.css';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function RootLayout({ children }: PropsWithChildren) {
  return children;
}
