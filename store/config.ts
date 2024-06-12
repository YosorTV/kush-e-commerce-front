import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  CartState,
  MenuState,
  ProductsState,
  TSearchState,
} from '@/types/store';
import { cartSlice } from './cart';
import { menuSlice } from './menu';
import { productsSlice } from './products';
import { searchSlice } from './search';

export const useCart = create<CartState>()(
  persist(cartSlice, { name: 'client-cart' })
);

export const useSearch = create<TSearchState>()(
  persist(searchSlice, { name: 'client-search' })
);

export const useMenu = create<MenuState>()(menuSlice);
export const useProducts = create<ProductsState>()(productsSlice);
