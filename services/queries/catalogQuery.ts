import { DEFAULT_LOCALE, IMAGE_FIELDS } from '@/helpers/constants';

// Catalog Query
export const catalogQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: {
    blocks: {
      populate: {
        title: true,
        collections: {
          populate: {
            title: true,
            hintText: true,
            cover: {
              fields: IMAGE_FIELDS,
            },
          },
        },
      },
    },
    cover: {
      populate: {
        fields: IMAGE_FIELDS,
      },
    },
  },
});
