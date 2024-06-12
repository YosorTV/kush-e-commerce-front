import { Product } from '@/types/components';

type PageProps = {
  locale: string;
  category: string;
  page: number;
  pageSize: number;
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
  }: PageProps) => Promise<void>;
  fetchMoreProducts: ({
    locale,
    category,
    page,
    pageSize,
  }: PageProps) => Promise<void>;
};
