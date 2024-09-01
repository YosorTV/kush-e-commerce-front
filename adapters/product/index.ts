import { formatPrice } from '@/helpers/formatters';
import { Product } from '@/types/components';

export const productsAdapter = (products: Product[], currency: number) => {
  return products.map((product) => ({
    ...product,
    price: formatPrice(Number(product.price), product.locale, currency)
  }));
};

interface ICompleteLookAdater {
  category: string;
  products: Product[];
}

export const completeLookAdapter = ({ category, products = [] }: ICompleteLookAdater) => {
  if (!products) return [];

  return products.filter((product: Product) => product.category !== category);
};

export const inWishlistDataAdatapter = (products: Product[]) => {
  if (!products) return [];

  return products.map((product) => ({ ...product, inWishlist: true }));
};
