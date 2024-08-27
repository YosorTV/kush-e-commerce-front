import { DEFAULT_LOCALE } from '@/helpers/constants';

export const wishlistNotify = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: '*'
});
