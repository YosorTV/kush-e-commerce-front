export interface Product {
  id: number;
  title: string;
  available: boolean;
  available_colors: string[];
  code: string;
  category: string;
  material: string;
  description: string;
  locale: string;
  price: number;
  priceText: string;
  saleValue: number;
  hintText: string;
  quantity: number;
  updatedAt: string;
  images: {
    data: any[];
  };
}

export interface ProductsContentProps {
  products: Product[];
}

export type ProductItem = {
  id: string;
  title: string;
  image?: {
    url: string;
    alternativeText: string;
  };
  quantity?: number | 1;
  unit_amount: number | null;
  price?: string;
};
