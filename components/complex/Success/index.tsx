'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { Button } from '@/components/elements';

import { useCart } from '@/store';

export const Success = () => {
  const cartStore = useCart();
  const t = useTranslations('cart');

  const handleClose = () => {
    cartStore.globalReset();
    cartStore.onToggle();
  };

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className='relative flex h-min w-full flex-col py-16'
    >
      <div className='flex flex-col items-center gap-y-2.5'>
        <motion.p
          className='text-sm text-base-200'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {t('thanks')}
        </motion.p>
        <Button onClick={handleClose} className='btn btn-link justify-start px-0 text-lg normal-case'>
          {t('proceed')}
        </Button>
      </div>
    </motion.div>
  );
};
