import { StateCreator } from 'zustand';

import { getProductsData } from '@/services';
import { ProductsState } from '@/types/store';

export const productsSlice: StateCreator<ProductsState> = (set) => ({
  isLoading: true,
  error: null,
  products: [],
  meta: { page: 1, pageCount: 0, pageSize: 0, total: 0 },
  fetchProducts: async ({ locale, category, page, pageSize, ...rest }) => {
    set({ isLoading: true, error: null });

    try {
      const productsResponse = await getProductsData({
        locale,
        page,
        pageSize,
        category,
        ...rest,
      });

      const { data, meta } = productsResponse;

      set({
        isLoading: false,
        products: data,
        meta: meta.pagination,
      });
    } catch (error) {
      set({ isLoading: false, error });
    }
  },

  fetchMoreProducts: async ({ locale, category, page, pageSize, ...rest }) => {
    set({ isLoading: true, error: null });

    try {
      const productsResponse = await getProductsData({
        locale,
        page,
        pageSize,
        category,
        ...rest,
      });

      const { meta } = productsResponse;

      set((state) => ({
        ...state,
        meta: meta.pagination,
        isLoading: false,
        products: state.products,
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
