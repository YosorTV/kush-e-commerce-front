import { DEFAULT_LOCALE } from '@/helpers/constants';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale = DEFAULT_LOCALE }) => {
  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    return { messages: {} };
  }
});
