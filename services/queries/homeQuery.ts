import { DEFAULT_LOCALE, IMAGE_FIELDS } from '@/helpers/constants';

// Home Query
export const homeQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: {
    blocks: {
      populate: {
        products: {
          populate: {
            images: {
              fields: IMAGE_FIELDS,
            },
          },
        },
        image: {
          fields: IMAGE_FIELDS,
        },
        sub_image: {
          fields: IMAGE_FIELDS,
        },
        link: {
          populate: true,
        },
      },
    },
  },
});
