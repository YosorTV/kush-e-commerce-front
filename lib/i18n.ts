import { getRequestConfig } from 'next-intl/server';
import { LOCALES } from '@/helpers/constants';

export default getRequestConfig(async ({ locale = 'uk' }) => {
  if (!LOCALES.includes(locale as 'uk' | 'en')) return { messages: [] };

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
