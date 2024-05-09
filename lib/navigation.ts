import { LOCALES, LOCALES_PREFIX } from '@/helpers/constants';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: LOCALES,
    localePrefix: LOCALES_PREFIX,
  });
