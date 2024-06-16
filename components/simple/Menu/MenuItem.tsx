'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

import { CategoryLinkType } from '@/types/components';
import { ROOT } from '@/helpers/constants';
import { NextLink } from '@/components/elements';
import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';
import { useSearchParams } from 'next/navigation';

const variants = {
  initial: {
    opacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
};

export const MenuItem: FC<CategoryLinkType> = ({
  text,
  url,
  slug,
  isExternal,
  className,
}) => {
  const pathname = usePathname();
  const params = useSearchParams();

  const category = params.get('category');

  const isActive =
    url === ROOT
      ? pathname === url
      : pathname.startsWith(url) || category === slug;

  return (
    <motion.li
      layout
      variants={variants}
      className={cn('group', { active: isActive }, className)}
    >
      <NextLink
        href={url}
        replace={isExternal}
        className='py-2.5 font-medium capitalize text-base-200 group-[.active]:underline group-[.active]:underline-offset-8'
      >
        {text}
      </NextLink>
    </motion.li>
  );
};
