export interface StrapiLinkType {
  id: number | string;
  url: string;
  text?: string;
  isExternal?: boolean;
}

export interface CategoryLinkType extends StrapiLinkType {
  id: number | string;
  url: string;
  title?: string;
  slug?: string;
}

export interface CollectionLinkType extends StrapiLinkType {
  id: number | string;
  url: string;
  title?: string;
  slug?: string;
}

export type LinkType = {
  href: string;
  children: React.ReactNode;
  className?: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
};
