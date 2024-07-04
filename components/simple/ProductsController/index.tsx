'use client';

import { useTranslations } from 'next-intl';
import { RiListSettingsLine } from 'react-icons/ri';

import { useFilters } from '@/store';

import { FilterForm } from '@/components/forms';
import { Button, Sidebar } from '@/components/elements';

export const ProductsController = ({ categories }: any) => {
  const t = useTranslations('filter');
  const state = useFilters();

  return (
    <nav className='flex w-full items-center justify-end gap-x-6 tracking-wider'>
      <div className='flex items-center gap-x-3 underline underline-offset-8'>
        <Button
          className='text-sm !font-medium md:text-xl'
          onClick={state.onToggle}
        >
          {t('title')}
        </Button>
        <RiListSettingsLine className='h-6 w-6 fill-base-200 ' />
        <Sidebar
          opened={state.isOpen}
          onToggle={state.onToggle}
          position='right'
        >
          <FilterForm categories={categories} />
        </Sidebar>
      </div>
    </nav>
  );
};
