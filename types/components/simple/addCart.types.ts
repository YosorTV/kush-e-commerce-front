import { ProductItem } from './products.type';

export type CartItemProps = {
  data: ProductItem;
  onAdd: () => void;
  onRemove: () => void;
};

export type AddCartProps = {
  data: ProductItem;
};
