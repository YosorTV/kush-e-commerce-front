import { DEFAULT_LOCALE } from '@/helpers/constants';

export const ordersQuery = ({ locale = DEFAULT_LOCALE, email, page, pageSize }: any) => ({
  locale,
  populate: '*',
  filters: {
    customer_email: {
      $eq: email
    }
  },
  pagination: {
    page,
    pageSize
  }
});
