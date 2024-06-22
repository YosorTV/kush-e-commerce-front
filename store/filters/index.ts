import { StateCreator } from 'zustand';
import { TFiltersState } from '@/types/store';

export const filterSlice: StateCreator<TFiltersState> = (set) => ({
  options: {
    sortValue: 'recommended',
    price: 0,
    materials: [],
  },
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
      options: {
        sortValue: 'recommended',
        price: 0,
        materials: [],
      },
      isOpen: false,
    }),
});
