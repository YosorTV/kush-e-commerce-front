import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { cartSlice } from './cart';
import { menuSlice } from './menu';
import { productsSlice } from './products';
import { searchSlice } from './search';
import { filterSlice } from './filters';

import {
  CartState,
  MenuState,
  ProductsState,
  TSearchState,
  TFiltersState,
} from '@/types/store';

export const useCart = create<CartState>()(
  persist(cartSlice, { name: 'client-cart' })
);

export const useSearch = create<TSearchState>()(
  persist(searchSlice, { name: 'client-search' })
);

export const useFilters = create<TFiltersState>()(
  persist(filterSlice, { name: 'client-filters' })
);

export const useMenu = create<MenuState>()(menuSlice);
export const useProducts = create<ProductsState>()(productsSlice);
