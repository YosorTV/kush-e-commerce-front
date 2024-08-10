import { DEFAULT_LOCALE, IMAGE_FIELDS, META_FIELDS } from '@/helpers/constants';
import { ISlugQuery } from '@/types/services/quries';

export const collectionQuery = ({ slug, locale = DEFAULT_LOCALE }: ISlugQuery) => ({
  locale,
  filters: {
    slug: {
      $eq: slug,
    },
  },
  fields: ['title', 'description', 'slug', 'hintText'],
  populate: {
    products: {
      populate: {
        slug: true,
        sizes: true,
        images: {
          populate: {
            data: {
              fields: IMAGE_FIELDS,
            },
          },
        },
      },
    },
    cover: {
      populate: {
        data: {
          fields: IMAGE_FIELDS,
        },
      },
    },
  },
});

export const collectionMetaQuery = ({ slug, locale = DEFAULT_LOCALE }: ISlugQuery) => ({
  locale,
  filters: {
    slug: {
      $eq: slug,
    },
  },
  populate: {
    seo: {
      fields: META_FIELDS,
    },
  },
});
