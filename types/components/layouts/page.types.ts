export type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
  cover?: {
    id?: number | string | undefined;
    url?: string | undefined;
    alternativeText?: string | undefined;
  };
};
