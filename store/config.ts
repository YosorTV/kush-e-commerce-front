import { CartState, MenuState } from '@/types/store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { cartSlice } from '@/store/cart';
import { menuSlice } from '@/store/menu';

export const useCart = create<CartState>()(
  persist(cartSlice, { name: 'client-cart' })
);

export const useMenu = create<MenuState>()(menuSlice);
