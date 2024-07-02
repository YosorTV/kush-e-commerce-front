import {
  AUTH_FORGOT_FIELDS,
  AUTH_LOGIN_FIELDS,
  AUTH_RESET_FIELDS,
  AUTH_SUCCESS_FIELDS,
  DEFAULT_LOCALE,
  IMAGE_FIELDS,
} from '@/helpers/constants';

export const authQuery = ({ locale = DEFAULT_LOCALE }) => ({
  registration: {
    locale,
    populate: {
      title: true,
      formFields: true,
      redirectUrl: true,
      submitBtn: true,
      cover: {
        fields: IMAGE_FIELDS,
      },
    },
  },
  success: {
    locale,
    populate: AUTH_SUCCESS_FIELDS,
  },
  forgot: {
    locale,
    populate: AUTH_FORGOT_FIELDS,
  },
  reset: {
    locale,
    populate: AUTH_RESET_FIELDS,
  },
  login: {
    locale,
    populate: AUTH_LOGIN_FIELDS,
  },
});
