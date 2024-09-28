'use client';

import qs from 'qs';

import { FormEvent, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { IoClose } from 'react-icons/io5';

import { useFilters } from '@/store';
import { usePathname, useRouter } from '@/lib/navigation';

import { CategoryList, MaterialList, RangeSlider, SizeList, SortFields } from '@/components/simple';
import { Accordion, Button, Input, Title } from '@/components/elements';

import { SORT_OPTIONS } from '@/helpers/constants';

export const FilterForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const state = useFilters();
  const t = useTranslations();
  const pathname = usePathname();

  const FILTER_OPTIONS = [
    {
      id: 1,
      title: t('category.title'),
      component: <CategoryList />
    },
    {
      id: 2,
      title: t('material.title'),
      component: <MaterialList />
    },
    {
      id: 3,
      title: t('size.title'),
      component: <SizeList />
    },
    {
      id: 4,
      title: t('price.title'),
      component: <RangeSlider />
    }
  ];

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const queryString = qs.stringify(state.options, {
        arrayFormat: 'repeat',
        encodeValuesOnly: true,
        skipNulls: true
      });

      state.onToggle();

      router.replace(`${pathname}?${queryString}`, { scroll: false });
    },
    [pathname, router, state]
  );

  const handleReset = useCallback(() => {
    state.onReset();

    router.replace(pathname, { scroll: false });
  }, [pathname, router, state]);

  return (
    <form onSubmit={handleSubmit} className='relative top-16 flex flex-col gap-y-2.5 pr-5'>
      <div className='flex w-full items-baseline justify-between'>
        <Title level='2' className='text-xl font-semibold text-base-200'>
          {t('sort.title')}:
        </Title>
        <Button type='button' onClick={state.onToggle} className='col-span-1 col-start-5 row-start-1 md:col-start-6'>
          <IoClose className='h-6 w-6 fill-base-200' />
        </Button>
      </div>
      <Input name='locale' defaultValue={locale} hidden className='hidden' />
      <SortFields data={SORT_OPTIONS} />
      <Accordion data={FILTER_OPTIONS} />
      <div className='my-4 flex w-full flex-col justify-between'>
        <Button type='submit' className='bg-transparent text-base-200 hover:!bg-base-200 hover:!text-base-100'>
          {t('filter.submit')}
        </Button>
        <div className='divider px-4' />
        <Button
          type='button'
          className='bg-transparent text-base-200 hover:!bg-base-200 hover:!text-base-100'
          onClick={handleReset}
        >
          {t('filter.reset')}
        </Button>
      </div>
    </form>
  );
};
