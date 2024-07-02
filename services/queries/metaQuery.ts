import { DEFAULT_LOCALE, META_FIELDS } from '@/helpers/constants';

// Meta Query
export const metaQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: { seo: { fields: META_FIELDS } },
});
