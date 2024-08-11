import { DEFAULT_LOCALE, IMAGE_FIELDS } from '@/helpers/constants';

export const aboutUsQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: {
    fields: ['title', 'description', 'story'],
    cover: {
      fields: IMAGE_FIELDS,
    },
    subImage: {
      fields: IMAGE_FIELDS,
    },
  },
});
