import { StripeLinkType } from './link.types';

export type HeaderProps = {
  session?: any;
  data?: {
    id: number | string;
    logoText: StripeLinkType;
    ctaButton: StripeLinkType;
    sessionLinks: StripeLinkType[];
  };
};
