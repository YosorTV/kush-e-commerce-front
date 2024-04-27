export type ProductItem = {
  id: string;
  name: string;
  image?: {
    url: string;
    alternativeText: string;
  };
  quantity?: number | 1;
  unit_amount: number | null;
  price?: string;
};

export type CartItemProps = {
  data: ProductItem;
  onAdd: () => void;
  onRemove: () => void;
};

export type AddCartProps = {
  data: ProductItem;
};
