import { MenuState } from '@/types/store';
import { StateCreator } from 'zustand';

export const menuSlice: StateCreator<MenuState> = (set) => ({
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set(() => ({ isOpen: false })),
});
