import { StripeLinkType } from './link.types';

export type HeaderProps = {
  session?: any;
  data?: {
    id: number | string;
    logoText: StripeLinkType;
    cta: StripeLinkType;
    sessionLinks: StripeLinkType[];
    pages: StripeLinkType[];
  };
};
