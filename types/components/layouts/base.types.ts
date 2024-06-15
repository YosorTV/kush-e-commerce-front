import React from 'react';
import { FooterProps, StrapiLinkType } from '@/types/components';

type HeaderData = {
  id: number | string;
  pages: StrapiLinkType[];
  cta: StrapiLinkType;
  sessionLinks: StrapiLinkType[];
  categoryTitle: string;
  collectionTitle?: string;
  categories: {
    data: any[];
  };
  collections?: {
    data: any[];
  };
  session?: any;
};

export type BaseLayoutProps = {
  children: React.ReactNode;
  locale: string;
  header: HeaderData;
  footer: FooterProps;
};
