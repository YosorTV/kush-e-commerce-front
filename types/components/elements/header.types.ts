import { Session } from 'next-auth';
import { StrapiLinkType } from './link.types';

export type HeaderProps = {
  locale: string;
  session: Session;
  data: {
    id: number | string;
    session?: any;
    pages: StrapiLinkType[];
    cta: StrapiLinkType;
    categoryTitle: string;
    collectionTitle?: string;
    searchTitle: string;
    pagesTitle: string;
    signOutTitle: string;
    categories: {
      data: any[];
    };
    collections?: {
      data: any[];
    };
    sessionLinks: StrapiLinkType[];
  };
  shoppingCart?: any;
};
