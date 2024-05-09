export type PageProps = {
  params: {
    id?: string;
    locale: string;
  };
  searchParams: {
    id?: string;
    page?: string;
    per_page?: string;
    sortBy?: string;
    locale?: string;
    filterBy?: string;
    name?: string;
    code?: string;
  };
};
