import React from 'react';
import { FooterProps, StripeLinkType } from '../elements';

type StrapiHeaderData = {
  id: number | string;
  logoText: StripeLinkType;
  ctaButton: StripeLinkType;
};

export type BaseLayoutProps = {
  children: React.ReactNode;
  header: StrapiHeaderData;
  footer: FooterProps;
  session?: any;
};
