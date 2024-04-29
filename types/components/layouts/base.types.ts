import React from 'react';
import { FooterProps, StripeLinkType } from '@/types/components';
import { ShoppingCartData } from '../complex';

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
  cart: ShoppingCartData['data'];
  session?: any;
};
