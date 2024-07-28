import { DEFAULT_LOCALE } from '@/helpers/constants';

export const sizeQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: '*',
});
