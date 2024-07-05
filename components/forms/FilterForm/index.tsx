'use client';

import { useLocale, useTranslations } from 'next-intl';
import { IoClose } from 'react-icons/io5';

import { useFilters } from '@/store';

import {
  MaterialList,
  RangeSlider,
  SizeList,
  SortFields,
  SubmitButton,
} from '@/components/simple';

import { Accordion, Button, Form, Input, Title } from '@/components/elements';

import { SORT_OPTIONS } from '@/helpers/constants';
import { filter } from '@/services';

export const FilterForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const state = useFilters();

  const FILTER_OPTIONS = [
    {
      id: 1,
      title: 'price',
      component: <RangeSlider />,
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
  ];

  return (
    <Form
      method='POST'
      state={{ data: state.options }}
      action={filter}
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
      <Input name='locale' value={locale} hidden className='hidden' />
      <SortFields data={SORT_OPTIONS} />
      <Accordion data={FILTER_OPTIONS} />
      <SubmitButton
        text={t('filter.submit')}
        loadingText={t('filter.progress')}
        className='!bg-base-200 !text-base-100'
      />
    </Form>
  );
};
