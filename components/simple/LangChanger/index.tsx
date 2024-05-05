'use client';

import { motion } from 'framer-motion';

import { useLang } from '@/store';
import { UAIcon, GBIcon } from '@/assets/icons';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { createQueryString, getUrlParams } from '@/lib';
import { animLang } from '@/assets/animations';

export const LangChanger = () => {
  const router = useRouter();
  const langStore = useLang();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [flipped, setFlipped] = useState<boolean>(false);
  const params = getUrlParams({ searchParams });

  useEffect(() => {
    const url = createQueryString(pathname, {
      ...params,
      locale: langStore.lang,
    });

    router.push(url);
  }, [langStore.lang, params, pathname, router]);

  const handleSwitch = async () => {
    const locale = langStore.lang === 'en' ? 'uk' : 'en';

    langStore.setLang(locale);
    setFlipped(!flipped);
  };

  const printFlagIcon = useMemo(() => {
    return langStore.lang === 'en' ? (
      <GBIcon className='border-2 border-base-200' />
    ) : (
      <UAIcon className='border-2 border-base-200' />
    );
  }, [langStore.lang]);

  return (
    <motion.button
      type='button'
      onClick={handleSwitch}
      animate={animLang({ flipped }).animate}
      initial={animLang({ flipped }).initial}
      transition={{ duration: 0.3 }}
      layout
    >
      {printFlagIcon}
    </motion.button>
  );
};
