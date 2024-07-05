import { DEFAULT_LOCALE, IMAGE_FIELDS } from '@/helpers/constants';

// Catalog Query
export const catalogQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: {
    cover: {
      fields: IMAGE_FIELDS,
    },
  },
});
