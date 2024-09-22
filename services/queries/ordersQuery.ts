import { DEFAULT_LOCALE } from '@/helpers/constants';

export const ordersQuery = ({ locale = DEFAULT_LOCALE, userId }: any) => ({
  locale,
  // filters: {
  //   user: {
  //     id: {
  //       $eq: userId
  //     }
  //   }
  // },
  populate: '*'
});
