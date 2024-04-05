import { ClientSideRender } from '@/components/complex/ClientSideRender';

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <ClientSideRender />
    </>
  );
}
