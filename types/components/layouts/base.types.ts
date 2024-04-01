import React from 'react';
import { FooterProps, HeaderProps } from '../elements';

export type BaseLayoutProps = {
  children: React.ReactNode;
  header: HeaderProps;
  footer: FooterProps;
};
