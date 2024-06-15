import { ChangeEvent, FC, ReactNode, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

import { useSearch } from '@/store';

import { Button, Input, Logo } from '@/components/elements';
import {
  childrenVariants,
  fadeVariants,
  searchVariants,
} from '@/assets/animations';
import { useLocale } from 'next-intl';
import { useDebounce } from '@/lib/hooks';

interface TSearchController {
  onClose: () => void;
  placeholder: string;
  children: ReactNode;
}

export const SearchController: FC<TSearchController> = ({
  onClose,
  placeholder = 'Search',
  children,
}) => {
  const state = useSearch();
  const locale = useLocale();
  const name = useDebounce(state.searchValue, 500);

  const getProducts = useCallback(
    () => state.fetchProducts({ locale, name, page: `${state.meta.page}` }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, locale, state.meta.page]
  );

  const handleSearch = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      state.onSearch(target.value);
    },
    [state]
  );

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, locale, state.meta.page]);

  return (
    <AnimatePresence mode='wait'>
      {state.isOpen && (
        <motion.div
          initial='initial'
          animate='animate'
          exit='exit'
          variants={searchVariants}
          className='fixed left-0 top-0 z-20 h-screen w-full'
        >
          <motion.div
            layout
            className='absolute right-0 top-0 z-20 h-screen w-full overflow-y-auto bg-base-100 p-8'
          >
            <motion.div
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={fadeVariants}
              className='grid w-full grid-cols-4 justify-center'
            >
              <Logo className='relative top-1.5 col-span-1 col-start-1 row-start-1 cursor-default' />
              <Input
                name='search'
                placeholder={placeholder}
                containerClass='col-span-5 md:col-span-3 lg:col-span-2 pt-6 md:pt-0 col-start-1 md:col-start-2 md:row-start-1 md:pr-16 lg:pr-0'
                value={state.searchValue}
                isLoading={state.isLoading}
                onChange={handleSearch}
              />

              <Button
                onClick={onClose}
                type='button'
                className='col-span-1 col-start-5 row-start-1 md:col-start-6'
              >
                <IoClose className='h-6 w-6 fill-base-200' />
              </Button>
            </motion.div>
            <motion.div
              initial='initial'
              animate='visible'
              exit='hidden'
              variants={childrenVariants}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
