import { StrapiLinkType } from './link.types';

export type HeaderProps = {
  data: {
    id: number | string;
    locale: string;
    session?: any;
    pages: StrapiLinkType[];
    cta: StrapiLinkType;
    categoryTitle: string;
    collectionTitle?: string;
    searchTitle: string;
    pagesTitle: string;
    categories: {
      data: any[];
    };
    collections?: {
      data: any[];
    };
    sessionLinks: StrapiLinkType[];
    shoppingCart?: any;
  };
};
