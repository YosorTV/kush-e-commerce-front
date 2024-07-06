import { Product } from '@/types/components';

type PageProps = {
  locale: string;
  page: number;
  pageSize: number;
  category?: string | string[];
};

export type ProductsState = {
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  error: any;
  products: Product[];
  isLoading: boolean;
  reset: () => void;
  fetchProducts: ({
    locale,
    category,
    page,
    pageSize,
    ...rest
  }: PageProps) => Promise<void>;
  fetchMoreProducts: ({
    locale,
    category,
    page,
    pageSize,
    ...rest
  }: PageProps) => Promise<void>;
};
