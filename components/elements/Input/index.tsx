'use client';

import { cn } from '@/lib';

import { InputProps } from '@/types/components';

import 'react-phone-input-2/lib/style.css';

import { InputPhone } from '@/components/elements/Input/InputPhone';
import { InputDefault } from '@/components/elements/Input/InputDefault';
import { InputPassword } from '@/components/elements/Input/InputPassword';

export const Input = ({
  name,
  className,
  error,
  validation = false,
  placeholder,
  type,
  label,
  labelStyle,
  containerClass,
  isLoading,
  children,
  id,
  ...rest
}: InputProps) => {
  const inputByType = () => {
    switch (type) {
      case 'password':
        return (
          <InputPassword
            id={id}
            key={id}
            name={name}
            validation={validation}
            placeholder={placeholder}
            error={Boolean(error)}
            {...rest}
          />
        );

      case 'tel':
        return (
          <InputPhone
            id={id}
            key={id}
            name={name}
            value={rest?.value as string}
            placeholder={placeholder}
            error={Boolean(error)}
          />
        );

      default:
        return (
          <InputDefault
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            className={className}
            error={Boolean(error)}
            {...rest}
          />
        );
    }
  };

  return (
    <div
      className={cn('relative flex w-full flex-col gap-y-2', containerClass)}
    >
      {label && (
        <label htmlFor={id} className={cn('label label-text p-0', labelStyle)}>
          {label}
        </label>
      )}
      <div className='relative flex'>
        {inputByType()}
        {children}
      </div>
      {isLoading && (
        <span className='loading loading-dots loading-md absolute right-3 top-10 md:right-20 md:top-3 lg:right-3' />
      )}
      {error && !validation && (
        <span className='relative text-xs text-error'>{error}</span>
      )}
    </div>
  );
};
