import { DEFAULT_LOCALE } from '@/helpers/constants';

export const policiesQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  fields: ['title', 'content'],
});
