import { Session } from 'next-auth';
import { StrapiLinkType } from '../elements';
import { AbstractIntlMessages } from 'next-intl';

type THeader = {
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

export type BaseLayoutProps = {
  locale: string;
  session: Session;
  messages: AbstractIntlMessages;
  header: THeader;
  footer: Record<string, string>;
  cart: Record<string, string>;
};
