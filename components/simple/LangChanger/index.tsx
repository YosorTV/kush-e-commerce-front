'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

import { UAIcon, GBIcon } from '@/assets/icons';
import { useMemo, useTransition } from 'react';
import { animLang } from '@/assets/animations';
import { createQueryString } from '@/lib';
import { useRouter } from 'next/navigation';

export const LangChanger = () => {
  const router = useRouter();
  const locale = useLocale();

  const [isPending, startTransition] = useTransition();

  const handleSwitch = () => {
    const { pathname, search } = window.location;

    const url = createQueryString(`${pathname}${search}`);

    startTransition(() => {
      router.replace(url);
    });
  };

  const printFlagIcon = useMemo(() => {
    return locale === 'en' && !isPending ? (
      <GBIcon className='border-2 border-base-200' />
    ) : (
      <UAIcon className='border-2 border-base-200' />
    );
  }, [locale, isPending]);

  return (
    <motion.button
      defaultValue={locale}
      defaultChecked={locale === 'uk'}
      disabled={isPending}
      type='button'
      onClick={handleSwitch}
      animate={animLang({ flipped: isPending }).animate}
      initial={animLang({ flipped: isPending }).initial}
      transition={{ duration: 0.3 }}
      layout
    >
      {printFlagIcon}
    </motion.button>
  );
};
