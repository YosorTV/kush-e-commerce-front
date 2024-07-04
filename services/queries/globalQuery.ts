import { CATEGORY_FIELDS, DEFAULT_LOCALE } from '@/helpers/constants';

// Global Query
export const globalQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: {
    header: {
      populate: {
        cta: true,
        pages: true,
        sessionLinks: true,
        signOutTitle: true,
        collections: {
          populate: {
            cover: true,
          },
          fields: CATEGORY_FIELDS,
        },
        categories: {
          fields: CATEGORY_FIELDS,
        },
      },
    },
    footer: {
      populate: {
        formField: true,
        termsLink: true,
        linksGroupTitle: true,
        links: true,
        socialLinks: true,
      },
    },
    shoppingCart: {
      populate: true,
    },
  },
});
