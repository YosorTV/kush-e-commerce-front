import { ThemeState } from '@/types/store';
import { StateCreator } from 'zustand';

export const themeSlice: StateCreator<ThemeState> = (set) => ({
  theme: 'light',
  setTheme: (value) => set(() => ({ theme: value })),
});
