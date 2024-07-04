import { MenuState, TSubMenuState } from '@/types/store';
import { StateCreator } from 'zustand';

export const menuSlice: StateCreator<MenuState> = (set) => ({
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set(() => ({ isOpen: false })),
});

export const subMenuSlice: StateCreator<TSubMenuState> = (set) => ({
  isOpen: false,
  showSubmenu: () => set({ isOpen: true }),
  hideSubmenu: () => set({ isOpen: false }),
});
