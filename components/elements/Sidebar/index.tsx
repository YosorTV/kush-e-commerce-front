'use client';

import { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { animCart } from '@/assets/animations';
import { cn } from '@/lib';

interface SidebarProps {
  opened: boolean;
  children: ReactNode;
  position: 'left' | 'right';
  onToggle: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  opened,
  position,
  children,
  onToggle,
}) => {
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
          <motion.div layout onClick={(e) => e.stopPropagation()}>
            <motion.div
              className={cn(
                'absolute top-0 h-screen w-full bg-base-100 p-8 xs:w-1/2',
                position === 'left' && 'left-0',
                position === 'right' && 'right-0'
              )}
            >
              <motion.div className='pt-10'>{children}</motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
