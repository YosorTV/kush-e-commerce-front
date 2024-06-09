export type PageProps = {
  params: {
    id?: string;
    locale: string;
  };
  searchParams: {
    id?: string;
    category?: string;
    page?: string;
    pageSize?: string;
    sortBy?: string;
    locale?: string;
    filterBy?: string;
    name?: string;
    code?: string;
  };
};
