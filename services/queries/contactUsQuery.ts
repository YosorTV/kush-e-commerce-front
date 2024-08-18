import { DEFAULT_LOCALE } from '@/helpers/constants';

export const contactUsQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: {
    formFields: true,
    submitBtn: true,
    fields: [
      'title',
      'emailTitle',
      'email',
      'phoneTitle',
      'primaryPhone',
      'secondaryPhone',
      'addressTitle',
      'socialLinks',
      'map',
    ],
  },
});

export const contactUsBlockQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: {
    fields: ['email', 'emailTitle', 'phoneTitle', 'primaryPhone', 'secondaryPhone', 'addressTitle', 'socialLinks'],
  },
});
