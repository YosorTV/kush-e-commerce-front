'use client';

import { useCallback, useEffect, useState } from 'react';

import { Range } from 'react-range';
import { useFilters } from '@/store';
import { getCurrency } from '@/services';
import { useLocale } from 'next-intl';
import { formatPrice } from '@/helpers/formatters';

export const RangeSlider = () => {
  const state = useFilters();
  const locale = useLocale();

  const [currency, setCurrency] = useState<number>(41);

  const fetchCurrency = async () => {
    const result = await getCurrency();

    setCurrency(result);
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  const handleRangeChange = useCallback(
    (values: number[]) => {
      state.onFilter({ key: 'price', value: values });
    },
    [state]
  );

  const min = formatPrice(state.options.price[0], locale, currency);
  const max = formatPrice(state.options.price[1], locale, currency);

  return (
    <div className='flex w-full flex-col px-2.5'>
      <Range
        step={1}
        min={1}
        max={3000}
        values={state.options.price}
        onChange={handleRangeChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className='relative h-2 w-full rounded-3xl bg-gray-500'
          >
            <div
              className='absolute h-2 bg-base-200'
              style={{
                left: `${(state.options.price[0] / 3000) * 100}%`,
                width: `${((state.options.price[1] - state.options.price[0]) / 3000) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className='flex h-4 w-4 items-center justify-center rounded-full border drop-shadow-xl'
            style={{ ...props.style }}
          >
            <span className='block h-full w-full rounded-full bg-neutral'></span>
          </div>
        )}
      />
      <div className='mt-2 flex w-full justify-between'>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
