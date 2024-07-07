'use client';

import { useTranslations } from 'next-intl';
import { RiListSettingsLine } from 'react-icons/ri';

import { useFilters } from '@/store';

import { FilterForm } from '@/components/forms';
import { Button, Sidebar, Title } from '@/components/elements';
import { cn } from '@/lib';
import { cormorant } from '@/assets/fonts';
import { FC } from 'react';

interface IProductsController {
  title?: string;
}

export const ProductsController: FC<IProductsController> = ({ title }) => {
  const state = useFilters();
  const t = useTranslations('filter');

  return (
    <nav className='flex w-full flex-col gap-x-6 tracking-wider md:flex-row md:items-center md:justify-between'>
      <Title
        level='2'
        className={cn(
          'py-2.5 text-left text-4xl uppercase text-base-200 md:py-5 lg:text-5xl',
          cormorant.className
        )}
      >
        {title}
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
