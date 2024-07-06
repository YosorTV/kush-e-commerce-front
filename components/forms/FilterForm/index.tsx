'use client';

import { FormEvent } from 'react';
import { IoClose } from 'react-icons/io5';
import { useLocale, useTranslations } from 'next-intl';

import { useFilters } from '@/store';

import {
  CategoryList,
  MaterialList,
  RangeSlider,
  SizeList,
  SortFields,
  SubmitButton,
} from '@/components/simple';

import { Accordion, Button, Input, Title } from '@/components/elements';

import { SORT_OPTIONS } from '@/helpers/constants';

export const FilterForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const state = useFilters();

  const FILTER_OPTIONS = [
    {
      id: 1,
      title: 'category',
      component: <CategoryList />,
    },
    {
      id: 2,
      title: 'material',
      component: <MaterialList />,
    },
    {
      id: 3,
      title: 'size',
      component: <SizeList />,
    },
    {
      id: 4,
      title: 'price',
      component: <RangeSlider />,
    },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(state.options);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex h-full flex-1 flex-col gap-y-2.5 pr-5'
    >
      <div className='flex w-full items-baseline justify-between'>
        <Title level='2' className='text-xl font-semibold text-base-200'>
          {t('sort.title')}:
        </Title>
        <Button
          type='button'
          onClick={state.onReset}
          className='col-span-1 col-start-5 row-start-1 md:col-start-6'
        >
          <IoClose className='h-6 w-6 fill-base-200' />
        </Button>
      </div>
      <Input name='locale' defaultValue={locale} hidden className='hidden' />
      <SortFields data={SORT_OPTIONS} />
      <Accordion data={FILTER_OPTIONS} />
      <SubmitButton
        text={t('filter.submit')}
        loadingText={t('filter.progress')}
        className='!bg-base-200 !text-base-100'
      />
    </form>
  );
};
