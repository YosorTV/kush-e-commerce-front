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

  const handleToggle = useCallback(() => {
    state.onToggle();
  }, [state]);

  return (
    <>
      <Button onClick={handleToggle} type='button'>
        <IoSearchSharp className='h-6 w-6 fill-base-200' />
      </Button>

      <Portal selector='portal'>
        <SearchController onClose={handleToggle}>
          <SearchContent />
        </SearchController>
      </Portal>
    </>
  );
};
