import { DEFAULT_LOCALE, IMAGE_FIELDS } from '@/helpers/constants';

interface IWishlistProducts {
  locale: string;
  userId: number;
}

export const wishlistProducts = ({ locale = DEFAULT_LOCALE, userId }: IWishlistProducts) => ({
  locale,
  populate: {
    products: {
      filters: {
        locale: {
          $eq: locale
        }
      },
      populate: {
        slug: true,
        colors: true,
        sizes: true,
        materials: true,
        collections: true,
        images: {
          populate: {
            data: {
              fields: IMAGE_FIELDS
            }
          }
        }
      }
    }
  },
  filters: {
    user: {
      id: {
        $eq: userId
      }
    }
  }
});