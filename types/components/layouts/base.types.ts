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
  header: HeaderData;
  footer: FooterProps;
  session?: any;
};
