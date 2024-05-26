export type StrapiLinkType = {
  id: number | string;
  url: string;
  text?: string;
  isExternal?: boolean;
};

export type LinkType = {
  href: string;
  children: React.ReactNode;
  className?: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
};
