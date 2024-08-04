import { StateCreator } from 'zustand';
import { TFiltersState } from '@/types/store';

const defaultOptions: TFiltersState['options'] = {
  sizes: [],
  materials: [],
  categories: [],
  sortBy: 'recommended',
  price: [1, 3000],
};

export const filterSlice: StateCreator<TFiltersState> = (set) => ({
  options: defaultOptions,
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onFilter: ({ key, value }) =>
    set((state) => ({
      options: {
        ...state.options,
        [key]: value,
      },
    })),
  onReset: () =>
    set({
      options: defaultOptions,
      isOpen: false,
    }),
});
