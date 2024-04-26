'use client';

import { ClientSideRender } from '@/components/complex/ClientSideRender';

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-grow flex-col overflow-x-hidden'>
      {children}
      <ClientSideRender />
    </div>
  );
}
