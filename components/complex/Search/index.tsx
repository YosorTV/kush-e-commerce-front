'use client';

import { FC, useCallback } from 'react';

import { IoSearchSharp } from 'react-icons/io5';

import { useSearch } from '@/store';
import { useScrollLock } from '@/lib/hooks';

import { Button, Portal } from '@/components/elements';
import { SearchController } from './SearchController';
import { SearchContent } from './SearchContent';

interface TSearch {
  data: any;
}

export const Search: FC<TSearch> = ({ data }) => {
  const state = useSearch();

  useScrollLock(state.isOpen);

  const handleOpen = useCallback(() => {
    state.onToggle();
  }, [state]);

  const handleClose = useCallback(() => {
    state.onReset();
  }, [state]);

  return (
    <>
      <Button onClick={handleOpen} type='button'>
        <IoSearchSharp className='h-6 w-6 fill-base-200' />
      </Button>

      <Portal selector='portal'>
        <SearchController onClose={handleClose}>
          <SearchContent />
        </SearchController>
      </Portal>
    </>
  );
};
