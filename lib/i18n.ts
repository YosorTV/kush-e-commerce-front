import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale = 'uk' }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
