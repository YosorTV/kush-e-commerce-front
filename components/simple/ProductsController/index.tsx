'use client';

import { useTranslations } from 'next-intl';
import { RiListSettingsLine } from 'react-icons/ri';

import { useFilters } from '@/store';

import { FilterForm } from '@/components/forms';
import { Button, Sidebar, Title } from '@/components/elements';
import { cn } from '@/lib';
import { cormorant } from '@/assets/fonts';

export const ProductsController = () => {
  const t = useTranslations('filter');
  const state = useFilters();

  return (
    <nav className='flex w-full items-center justify-between gap-x-6 tracking-wider'>
      <Title
        level='2'
        className={cn(
          'py-5 text-left text-4xl uppercase text-base-200 lg:text-5xl',
          cormorant.className
        )}
      >
        {t('products')}
      </Title>
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
          <FilterForm />
        </Sidebar>
      </div>
    </nav>
  );
};
