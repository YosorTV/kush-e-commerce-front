import { formatPrice } from '@/helpers/formatters';
import { Product } from '@/types/components';

export const productDataAdapter = (products: Product[], currency: number) => {
  return products.map((product) => ({
    ...product,
    price: formatPrice(Number(product.price), product.locale, currency),
  }));
};
