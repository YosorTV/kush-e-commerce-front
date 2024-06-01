'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

import { StrapiLinkType } from '@/types/components';
import { ROOT } from '@/helpers/constants';
import { NextLink } from '@/components/elements';
import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem: FC<StrapiLinkType> = ({ text, id, url, isExternal }) => {
  const pathname = usePathname();
  const isActive = url === ROOT ? pathname === url : pathname.startsWith(url);

  return (
    <motion.li
      key={id}
      variants={variants}
      className={cn('group py-2.5', { active: isActive })}
    >
      <NextLink
        href={url}
        replace={isExternal}
        className='py-2.5 font-medium text-base-200 group-[.active]:underline group-[.active]:underline-offset-8'
      >
        {text}
      </NextLink>
    </motion.li>
  );
};
