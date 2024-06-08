export type ProductItem = {
  id: number;
  name: string;
  image?: {
    url: string;
    alternativeText: string;
  };
  quantity?: number | 1;
  price: number;
};

export type CartItemProps = {
  data: ProductItem;
  onAdd: () => void;
  onRemove: () => void;
};

export type AddCartProps = {
  data: ProductItem;
  text: string;
};
