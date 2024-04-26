export type CartItemType = {
  name: string;
  id: string;
  images?: string[] | string;
  description?: string;
  unit_amount: number | null;
  quantity?: number;
};

type FormKey = 'checkout' | 'cart' | 'success';

export type CartState = {
  cart: CartItemType[];
  key: FormKey;
  isOpen: boolean;
  paymentIntentId: string;
  setPaymentIntentId: (value: string) => void;
  setForm: (value: FormKey) => void;
  onToggle: () => void;
  onAdd: (item: CartItemType) => void;
  onRemove: (item: CartItemType) => void;
  onReset: () => void;
};
