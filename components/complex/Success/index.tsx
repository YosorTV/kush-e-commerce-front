'use client';

import { Button } from '@/components/elements';
import { useCart } from '@/store';
import { motion } from 'framer-motion';

export const Success = () => {
  const cartStore = useCart();

  const handleClose = () => {
    cartStore.globalReset();
    cartStore.onToggle();
  };

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className='relative flex w-full flex-col py-16'
    >
      <div className='flex flex-col items-center gap-y-2.5'>
        <motion.p
          className='text-sm text-base-200'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Дякуємо за покупку
        </motion.p>
        <Button onClick={handleClose} className='btn btn-link justify-start px-0 text-lg normal-case'>
          Продовжити покупки
        </Button>
      </div>
    </motion.div>
  );
};
