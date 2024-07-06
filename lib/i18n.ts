import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { LOCALES } from '@/helpers/constants';

export default getRequestConfig(async ({ locale = 'uk' }) => {
  if (!LOCALES.includes(locale as 'uk' | 'en')) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
