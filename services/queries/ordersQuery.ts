import { DEFAULT_LOCALE } from '@/helpers/constants';

export const ordersQuery = ({ locale = DEFAULT_LOCALE, email }: any) => ({
  locale,
  filters: {
    customer_email: {
      $eq: email
    }
  },
  populate: '*'
});
