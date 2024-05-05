import React from 'react';

export type LayoutProps = {
  children: React.ReactNode;
  params: any;
  searchParams: {
    locale?: string;
    page?: string;
    per_page?: string;
    sortBy?: string;
    filterBy?: string;
    search?: string;
  };
};
