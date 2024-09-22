import { DEFAULT_LOCALE } from '@/helpers/constants';

export const ordersQuery = ({ locale = DEFAULT_LOCALE, userId }: any) => ({
  locale,
  populate: {
    products: true,
    status: true,
    amount: true,
    publishedAt: true,
    self_delivery: true
  },
  filters: {
    user: {
      id: {
        $eq: userId
      }
    }
  }
});
