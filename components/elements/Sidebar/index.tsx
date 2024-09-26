'use client';

import { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { animCart } from '@/assets/animations';
import { cn } from '@/lib';
import { useScrollLock } from '@/lib/hooks';

interface SidebarProps {
  opened: boolean;
  children: ReactNode;
  position: 'left' | 'right';
  onToggle: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ opened, position, children, onToggle }) => {
  useScrollLock(opened);

  return (
    <AnimatePresence mode='wait'>
      {opened && (
        <motion.div
          initial={animCart.fade.initial}
          animate={animCart.fade.animate}
          exit={animCart.fade.exit}
          onClick={onToggle}
          className='fixed left-0 top-0 z-20 h-screen w-full bg-black/50'
        >
          <motion.div
            layout
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'md:1/2 fixed top-0 h-screen w-full bg-info-content p-5 pr-0 sm:w-1/2 lg:w-1/3',
              position === 'left' && 'left-0',
              position === 'right' && 'right-0'
            )}
          >
            <motion.div className='z-50 overflow-auto'>{children}</motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
