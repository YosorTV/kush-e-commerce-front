export type CartItemType = {
  id: string | null;
  name: string | null;
  images?: any | any[];
  description?: string | null;
  unit_amount: number;
  material?: string | null;
  category?: string | null;
  color?: string | null;
  size?: number | null;
  quantity?: number;
};

type FormKey = 'checkout' | 'cart' | 'success' | 'delivery';

export type CartState = {
  formState: CartItemType;
  cart: CartItemType[];
  key: FormKey;
  isOpen: boolean;
  paymentIntentId: string;
  setPaymentIntentId: (value: string) => void;
  setForm: (value: FormKey) => void;
  onToggle: () => void;
  onAdd: (field: { key: keyof CartItemType; value: any }) => void;
  onSubmit: (item: CartItemType) => void;
  onRemove: (item: CartItemType) => void;
  onReset: () => void;
  onIncrease: (data: CartItemType) => void;
  syncCartData: (data: CartItemType) => void;
};
