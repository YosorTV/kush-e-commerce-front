import { StrapiLinkType } from './link.types';

export type HeaderProps = {
  data: {
    id: number | string;
    locale: string;
    session?: any;
    pages: StrapiLinkType[];
    cta: StrapiLinkType;
    sessionLinks: StrapiLinkType[];
    shoppingCart?: any;
  };
};
