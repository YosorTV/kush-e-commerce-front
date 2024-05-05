import { LangState } from '@/types/store';
import { StateCreator } from 'zustand';

export const langSlice: StateCreator<LangState> = (set) => {
  return {
    lang: 'uk',
    setLang: (value) => set(() => ({ lang: value })),
  };
};
