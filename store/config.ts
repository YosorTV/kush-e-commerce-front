import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartState, MenuState, ProductsState } from '@/types/store';
import { cartSlice } from './cart';
import { menuSlice } from './menu';
import { productsSlice } from './products';

export const useCart = create<CartState>()(
  persist(cartSlice, { name: 'client-cart' })
);
export const useMenu = create<MenuState>()(menuSlice);
export const useProducts = create<ProductsState>()(productsSlice);
