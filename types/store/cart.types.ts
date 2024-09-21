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

export interface IDeliveryForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  self: boolean;
  novapostWarehouse: Record<string, string | null>;
  novapostCity: Record<string, string | null>;
}

type FormKey = 'checkout' | 'cart' | 'success' | 'delivery';

export type CartState = {
  formState: CartItemType;
  delivery: IDeliveryForm;
  cart: CartItemType[];
  globalReset: () => void;
  key: FormKey;
  isOpen: boolean;
  paymentIntentId: string;
  setDelivery: (key: keyof IDeliveryForm, value: any) => void;
  setPaymentIntentId: (value: string) => void;
  setForm: (value: FormKey) => void;
  onToggle: () => void;
  onAdd: (field: { key: keyof CartItemType; value: any }) => void;
  onSubmit: (item: CartItemType) => void;
  onRemove: (item: CartItemType) => void;
  onReset: () => void;
  onIncrease: (data: CartItemType) => void;
  resetDelivery: () => void;
  syncCartData: (data: CartItemType) => void;
};
