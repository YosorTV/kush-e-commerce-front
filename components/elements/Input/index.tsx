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
  containerClass,
  isLoading,
  children,
  ...rest
}: InputProps) => {
  return (
    <div
      className={cn(
        'relative flex w-full flex-1 flex-col gap-y-2',
        containerClass
      )}
    >
      {label && (
        <label htmlFor={name} className={cn('label label-text', labelStyle)}>
          {label}
        </label>
      )}
      <div className='relative flex'>
        <input
          name={name}
          {...rest}
          type={type}
          placeholder={placeholder}
          className={cn(
            'autofill:bg-red-600! input w-full cursor-pointer',
            !error ? 'input input-bordered' : 'input-error',
            className
          )}
        />
        {children}
      </div>
      {isLoading && (
        <span className='loading loading-dots loading-md absolute right-3 top-10 md:right-20 md:top-3 lg:right-3' />
      )}
      {error && <span className={`relative text-xs text-error`}>{error}</span>}
    </div>
  );
};
