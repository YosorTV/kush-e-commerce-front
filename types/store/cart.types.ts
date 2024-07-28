export type CartItemType = {
  id: string;
  name: string;
  images?: any | any[];
  description?: string;
  unit_amount: number;
  material?: string;
  color?: string;
  size?: number;
  quantity?: number;
};

type FormKey = 'checkout' | 'cart' | 'success';

export type FormState = {
  color: string | null;
  id: string | null;
  material: string | null;
  name: string | null;
  size: number | null;
  unit_amount: number;
  description: string | null;
  images: (string | null)[];
  quantity: number;
};

export type CartState = {
  formState: FormState;
  cart: CartItemType[];
  key: FormKey;
  isOpen: boolean;
  paymentIntentId: string;
  setPaymentIntentId: (value: string) => void;
  setForm: (value: FormKey) => void;
  onToggle: () => void;
  onAdd: (field: { key: keyof FormState; value: any }) => void;
  onSubmit: (item: CartItemType) => void;
  onRemove: (item: CartItemType) => void;
  onReset: () => void;
};
