import { DEFAULT_LOCALE } from '@/helpers/constants';

export const wishlistProducts = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: '*'
});
