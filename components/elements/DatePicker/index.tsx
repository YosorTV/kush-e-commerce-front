'use client';

import { FC, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

import { cn } from '@/lib';

interface IDatePicker {
  id: string;
  name: string;
  className?: string;
  error?: boolean;
  placeholder?: string;
}

const DatePicker: FC<IDatePicker> = ({ id, name, className, error, placeholder }) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  });

  return (
    <Datepicker
      inputId={id}
      inputName={name}
      placeholder={placeholder}
      inputClassName={className}
      containerClassName={cn(error && 'border-error')}
      asSingle
      useRange={false}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export default DatePicker;
