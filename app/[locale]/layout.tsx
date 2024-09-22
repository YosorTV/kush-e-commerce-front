import { unstable_setRequestLocale } from 'next-intl/server';

import { LOCALES } from '@/helpers/constants';

import { LayoutProps } from '@/types/app/layout.types';

import BaseLayout from '@/components/layouts/Base';
import RootProvider from '@/components/providers/RootProvider';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <RootProvider>
      <BaseLayout locale={locale}>{children}</BaseLayout>
    </RootProvider>
  );
}
