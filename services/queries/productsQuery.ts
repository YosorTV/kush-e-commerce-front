import { DEFAULT_LOCALE, IMAGE_FIELDS } from '@/helpers/constants';
import { PageProps } from '@/types/app/page.types';

// Get Products Query
export const productsQuery = ({
  id,
  name,
  locale = DEFAULT_LOCALE,
  category,
  page = '1',
  pageSize = '5',
}: PageProps['searchParams']) => {
  const filters: Record<string, any> = {};

  if (name) {
    filters.title = { $contains: name.toLowerCase().trim() };
  }

  if (category && category !== '*') {
    filters.category = { $eq: category.toLowerCase().trim() };
  }

  return {
    id,
    name,
    locale,
    populate: {
      images: {
        populate: {
          data: {
            fields: IMAGE_FIELDS,
          },
        },
      },
    },
    filters,
    pagination: {
      page,
      pageSize,
    },
  };
};
