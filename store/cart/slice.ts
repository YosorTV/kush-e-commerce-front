import { CartState } from '@/types/store';
import { StateCreator } from 'zustand';

export const cartSlice: StateCreator<CartState> = (set) => ({
  cart: [],
  key: 'cart',
  isOpen: false,
  paymentIntentId: '',
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onAdd: (item) =>
    set((state) => {
      const existedItem = state.cart.find(({ id }) => item.id === id);

      if (existedItem) {
        const updatedCart = state.cart.map((el) => {
          if (el.id === item.id) return { ...el, quantity: el.quantity! + 1 };

          return el;
        });
        return { cart: updatedCart };
      }

      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  onRemove: (item) =>
    set((state) => {
      const existedItem = state.cart.find((el) => el.id === item.id);

      if (existedItem && existedItem.quantity! > 1) {
        const updatedCart = state.cart.map((el) => {
          if (el.id === item.id) return { ...el, quantity: el.quantity! - 1 };
          return el;
        });

        return { cart: updatedCart };
      }

      return { cart: state.cart.filter((el) => el.id !== item.id) };
    }),
  onReset: () =>
    set(() => ({ cart: [], key: 'cart', isOpen: false, paymentIntentId: '' })),
  setPaymentIntentId: (value) => set(() => ({ paymentIntentId: value })),
  setForm: (value) => set(() => ({ key: value })),
});
