import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { cartSlice } from './cart';
import { searchSlice } from './search';
import { filterSlice } from './filters';
import { activitySlice } from './activity';
import { menuSlice, subMenuSlice } from './menu';

import { CartState, MenuState, TSearchState, TFiltersState, TSubMenuState, TActivityState } from '@/types/store';

export const useCart = create<CartState>()(persist(cartSlice, { name: 'client-cart' }));
export const useSearch = create<TSearchState>()(persist(searchSlice, { name: 'client-search' }));
export const useFilters = create<TFiltersState>()(persist(filterSlice, { name: 'client-filters' }));
export const useActivity = create<TActivityState>()(persist(activitySlice, { name: 'client-activity' }));

export const useMenu = create<MenuState>()(menuSlice);
export const useSubMenu = create<TSubMenuState>()(subMenuSlice);
