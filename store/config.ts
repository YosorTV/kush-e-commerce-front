import { CartState, ThemeState } from '@/types/store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { cartSlice } from '@/store/cart';
import { themeSlice } from '@/store/theme';

export const useCart = create<CartState>()(
  persist(cartSlice, { name: 'client-cart' })
);

export const useTheme = create<ThemeState>()(
  persist(themeSlice, { name: 'client-theme' })
);
