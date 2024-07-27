export type PageProps = {
  params: {
    id?: string;
    locale: string;
    slug?: string;
  };
  searchParams: {
    id?: string;
    category?: string;
    categories?: string[];
    page?: string;
    pageSize?: string;
    sortBy?: string;
    locale?: string;
    filterBy?: string;
    name?: string;
    code?: string;
    price?: string;
    sizes?: string | string[];
    materials?: string | string[];
    color?: string | string[];
  };
};
