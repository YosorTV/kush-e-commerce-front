import { DEFAULT_LOCALE, IMAGE_FIELDS, META_FIELDS } from '@/helpers/constants';

type TProductQuery = {
  locale: string;
  slug: string;
};

// Profile Query
export const productQuery = ({ slug, locale = DEFAULT_LOCALE }: TProductQuery) => ({
  locale,
  filters: {
    slug: {
      $eq: slug
    }
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
    'available',
    'slug'
  ],
  populate: {
    colors: true,
    materials: true,
    sizes: true,
    collections: {
      populate: {
        data: {
          fields: ['title']
        }
      }
    },
    images: {
      populate: {
        data: {
          fields: IMAGE_FIELDS
        }
      }
    }
  }
});

export const productMetaQuery = ({ slug, locale = DEFAULT_LOCALE }: TProductQuery) => ({
  locale,
  filters: {
    slug: {
      $eq: slug
    }
  },
  populate: {
    seo: {
      fields: META_FIELDS
    }
  }
});
