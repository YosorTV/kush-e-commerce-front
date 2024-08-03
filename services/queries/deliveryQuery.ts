import { DEFAULT_LOCALE } from '@/helpers/constants';

export const deliveryQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: {
    title: true,
    description: true,
    rules: true,
  },
});
