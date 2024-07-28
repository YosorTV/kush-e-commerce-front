import { CartState } from '@/types/store';
import { StateCreator } from 'zustand';

export const cartSlice: StateCreator<CartState> = (set) => ({
  formState: {
    color: null,
    id: null,
    material: null,
    name: null,
    size: null,
    unit_amount: 0,
    description: null,
    images: [],
    quantity: 0,
  },
  cart: [],
  key: 'cart',
  isOpen: false,
  paymentIntentId: '',
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onSubmit: (item) =>
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
  onAdd: ({ key, value }) =>
    set((state) => ({
      formState: {
        ...state.formState,
        [key]: value,
      },
    })),
  onReset: () =>
    set(() => ({
      cart: [],
      paymentIntentId: '',
      formState: {
        color: null,
        id: null,
        material: null,
        name: null,
        size: null,
        unit_amount: 0,
        description: null,
        images: [],
        quantity: 0,
      },
    })),
  setPaymentIntentId: (value) => set(() => ({ paymentIntentId: value })),
  setForm: (value) => set(() => ({ key: value })),
});
