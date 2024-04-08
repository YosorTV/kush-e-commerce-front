import { ClientSideRender } from '@/components/complex/ClientSideRender';

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-grow flex-col overflow-y-auto overflow-x-hidden'>
      {children}
      <ClientSideRender />
    </div>
  );
}
