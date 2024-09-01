import { DEFAULT_LOCALE, PROFILE_FIELDS } from '@/helpers/constants';

export const profileLayoutQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: { navigation: true }
});

// Profile Query
export const profileQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: {
    formFields: {
      populate: PROFILE_FIELDS
    }
  }
});
