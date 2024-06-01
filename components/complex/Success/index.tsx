'use client';

// import { Link } from '@/lib/navigation';
import { useCart } from '@/store';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export const Success = () => {
  const cartStore = useCart();

  useEffect(() => {
    cartStore.onReset();
  }, []);

  const handleClose = () => {
    cartStore.setForm('cart');
    cartStore.onToggle();
  };

  // const MotionLink = motion(Link);

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
          Check your email for the reciept.
        </motion.p>
        <button className='btn btn-primary' onClick={handleClose}>
          Proceed with shopping
        </button>
      </div>
    </motion.div>
  );
};
