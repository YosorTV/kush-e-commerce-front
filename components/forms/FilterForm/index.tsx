'use client';

import { useTranslations } from 'next-intl';
import { IoClose } from 'react-icons/io5';

import { useFilters } from '@/store';

import {
  MaterialList,
  RangeSlider,
  SortFields,
  SubmitButton,
} from '@/components/simple';

import { Accordion, Button, Form, Title } from '@/components/elements';

import { SORT_OPTIONS } from '@/helpers/constants';

export const FilterForm = () => {
  const t = useTranslations();
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
  ];

  return (
    <Form method='POST' className='flex h-full flex-1 flex-col pr-5'>
      <div className='flex w-full items-baseline justify-between pb-10'>
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
      <SortFields data={SORT_OPTIONS} />
      <Accordion data={FILTER_OPTIONS} />
      <SubmitButton
        disabled
        className='!bg-base-200 !text-base-100'
        text={t('filter.submit')}
        loadingText={t('filter.progress')}
      />
    </Form>
  );
};
