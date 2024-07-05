import { ReactNode } from 'react';

import './globals.css';

type TRootLayout = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Readonly<TRootLayout>) {
  return children;
}
