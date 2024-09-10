import { CartItemType } from '@/types/store';
import { ProductItem } from './products.type';

export type CartItemProps = {
  data: CartItemType;
  currency: number;
  onAdd: () => void;
  onRemove: () => void;
};

export type AddCartProps = {
  data: ProductItem;
};
