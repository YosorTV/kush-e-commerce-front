import { StateCreator } from 'zustand';
import { TSearchState } from '@/types/store';
import { getProductsData } from '@/services';

export const searchSlice: StateCreator<TSearchState> = (set) => ({
  isOpen: false,
  isLoading: false,
  searchValue: '',
  searchResult: [],
  error: null,
  meta: { page: 1, pageCount: 0, pageSize: 4, total: 0 },
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onSearch: (value) => set({ searchValue: value }),
  onReset: () =>
    set({
      isOpen: false,
      error: null,
      searchValue: '',
      meta: { page: 1, pageCount: 0, pageSize: 4, total: 0 },
    }),
  fetchProducts: async ({ locale, name, page, pageSize }) => {
    set({ isLoading: true, error: null });

    try {
      const { data, meta } = await getProductsData({
        locale,
        name,
        page,
        pageSize,
      });

      set({
        isLoading: false,
        searchResult: data,
        meta: meta.pagination,
      });
    } catch (error) {
      set({ isLoading: false, error });
    }
  },
});
