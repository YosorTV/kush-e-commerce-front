import { DEFAULT_LOCALE, IMAGE_FIELDS } from '@/helpers/constants';

type TProductQuery = {
  locale: string;
  slug: string;
};

// Profile Query
export const productQuery = ({
  slug,
  locale = DEFAULT_LOCALE,
}: TProductQuery) => ({
  locale,
  filters: {
    slug: {
      $eq: slug,
    },
  },
  fields: [
    'title',
    'color',
    'price',
    'priceText',
    'hintText',
    'category',
    'saleValue',
    'description',
  ],
  populate: {
    colors: true,
    materials: true,
    sizes: true,
    collections: {
      populate: {
        data: {
          fields: ['title'],
        },
      },
    },
    images: {
      populate: {
        data: {
          fields: IMAGE_FIELDS,
        },
      },
    },
  },
});
