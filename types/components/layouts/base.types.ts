import React from 'react';
import { FooterProps, StripeLinkType } from '@/types/components';

type HeaderData = {
  id: number | string;
  logoText: StripeLinkType;
  ctaButton: StripeLinkType;
  sessionLinks: StripeLinkType[];
};

export type BaseLayoutProps = {
  children: React.ReactNode;
  locale: string;
  header: HeaderData;
  footer: FooterProps;
  session?: any;
};
