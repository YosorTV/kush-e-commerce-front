'use client';

import { FC, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

import { cn } from '@/lib';
import { useLocale } from 'next-intl';
import { DEFAULT_LOCALE } from '@/helpers/constants';

interface IDatePicker {
  id: string;
  name: string;
  className?: string;
  error?: boolean;
  placeholder?: string;
  defaultValue?: string;
}

const DatePicker: FC<IDatePicker> = ({ id, name, className, error, placeholder, ...rest }) => {
  const locale = useLocale();

  const [value, setValue] = useState({
    startDate: new Date(rest?.defaultValue) ?? null,
    endDate: new Date(rest?.defaultValue) ?? null
  });

  return (
    <Datepicker
      i18n={locale || DEFAULT_LOCALE}
      inputId={id}
      inputName={name}
      placeholder={placeholder}
      inputClassName={cn(className, 'bg-base-100 input input-bordered w-full text-base-200', error && 'border-error')}
      primaryColor='amber'
      displayFormat='YYYY-MM-DD'
      asSingle
      useRange={false}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export default DatePicker;
