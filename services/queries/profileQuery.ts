import { DEFAULT_LOCALE, PROFILE_FIELDS } from '@/helpers/constants';

// Profile Query
export const profileQuery = ({ locale = DEFAULT_LOCALE }) => ({
  locale,
  populate: {
    formFields: {
      populate: PROFILE_FIELDS,
    },
  },
});
