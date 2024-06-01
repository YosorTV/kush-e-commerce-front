import { cn } from '@/lib';
import { InputProps } from '@/types/components';
import React from 'react';

export const Input = ({
  name,
  className,
  error,
  placeholder,
  type,
  label,
  labelStyle,
  ...rest
}: InputProps) => {
  return (
    <div className='relative flex w-full flex-col gap-y-2'>
      <label htmlFor={name} className={cn('label label-text', labelStyle)}>
        {label}
      </label>
      <input
        name={name}
        {...rest}
        type={type}
        placeholder={placeholder}
        className={cn(
          'input cursor-pointer',
          !error ? 'input input-bordered' : 'input-error',
          className
        )}
      />
      {error && <span className={`relative text-xs text-error`}>{error}</span>}
    </div>
  );
};
