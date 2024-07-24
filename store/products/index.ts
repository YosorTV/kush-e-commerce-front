import { StateCreator } from 'zustand';

import { getProductsData } from '@/services';
import { ProductsState } from '@/types/store';
import { productDataAdapter } from '@/adapters/product';
import { getCurrency } from '@/services/api/get-currency';

export const productsSlice: StateCreator<ProductsState> = (set) => ({
  isLoading: true,
  error: null,
  products: [],
  meta: { page: 1, pageCount: 0, pageSize: 0, total: 0 },
  fetchProducts: async ({ locale, category, page, pageSize, ...rest }) => {
    set({ isLoading: true, error: null });

    try {
      const [productsResponse, currency] = await Promise.all([
        getProductsData({
          locale,
          page,
          pageSize,
          category,
          ...rest,
        }),
        getCurrency(),
      ]);

      const { data, meta } = productsResponse;

      set({
        isLoading: false,
        products: productDataAdapter(data, currency),
        meta: meta.pagination,
      });
    } catch (error) {
      set({ isLoading: false, error });
    }
  },

  fetchMoreProducts: async ({ locale, category, page, pageSize, ...rest }) => {
    set({ isLoading: true, error: null });

    try {
      const [productsResponse, currency] = await Promise.all([
        getProductsData({
          locale,
          page,
          pageSize,
          category,
          ...rest,
        }),
        getCurrency(),
      ]);

      const { data, meta } = productsResponse;

      set((state) => ({
        ...state,
        meta: meta.pagination,
        isLoading: false,
        products: [...state.products, ...productDataAdapter(data, currency)],
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  reset: () =>
    set({
      isLoading: false,
      products: [],
      meta: { page: 1, pageCount: 1, pageSize: 5, total: 0 },
    }),
});
