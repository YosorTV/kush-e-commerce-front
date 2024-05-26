import React from 'react';
import { FooterProps, StripeLinkType } from '@/types/components';

type HeaderData = {
  id: number | string;
  logoText: StripeLinkType;
  cta: StripeLinkType;
  sessionLinks: StripeLinkType[];
  pages: StripeLinkType[];
};

export type BaseLayoutProps = {
  children: React.ReactNode;
  locale: string;
  header: HeaderData;
  footer: FooterProps;
  session?: any;
};
