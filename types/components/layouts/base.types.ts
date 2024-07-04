import React from 'react';

import { FooterProps, HeaderProps } from '@/types/components';

export type BaseLayoutProps = {
  children: React.ReactNode;
  locale: string;
  header: HeaderProps['data'];
  footer: FooterProps;
};
