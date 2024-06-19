import { StateCreator } from 'zustand';
import { TFiltersState } from '@/types/store';

export const filterSlice: StateCreator<TFiltersState> = (set) => ({
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
});
