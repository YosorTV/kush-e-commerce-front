interface LayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Readonly<LayoutProps>) {
  return children;
}
