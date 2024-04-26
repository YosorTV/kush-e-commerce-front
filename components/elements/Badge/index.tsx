'use client';

import { FC } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { animCounter } from '@/assets/animations';
import { BadgeProps } from '@/types/components';

export const Badge: FC<BadgeProps> = ({ counter }) => {
  return (
    <AnimatePresence>
      <motion.span
        initial={animCounter.initial}
        animate={animCounter.animate}
        className='absolute bottom-4 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white'
      >
        {counter}
      </motion.span>
    </AnimatePresence>
  );
};
