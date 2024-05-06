export type PageProps = {
  params: any;
  searchParams: {
    id?: string;
    locale?: string;
    page?: string;
    per_page?: string;
    sortBy?: string;
    filterBy?: string;
    name?: string;
    code?: string;
  };
};
