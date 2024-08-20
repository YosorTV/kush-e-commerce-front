import { ProductItem } from './products.type';

export type CartItemProps = {
  data: ProductItem;
  currency: number;
  onAdd: () => void;
  onRemove: () => void;
};

export type AddCartProps = {
  data: ProductItem;
};
