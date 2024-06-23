'use client';

import PhoneInput from 'react-phone-input-2';
import { cn } from '@/lib';
import { InputProps } from '@/types/components';

import 'react-phone-input-2/lib/style.css';

const textInputTypes = (type: HTMLInputElement['type']) => {
  const customTypesStyles = ['radio', 'checkbox', 'range', 'file', 'date'];

  return !customTypesStyles.includes(type);
};

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
  id,
  ...rest
}: InputProps) => {
  const isTextType = textInputTypes(type);

  const printInput = () => {
    if (type === 'tel') {
      return (
        <PhoneInput
          value={rest.value as string}
          inputProps={{
            id,
            name,
            placeholder,
            type: 'tel',
          }}
          key={id}
          excludeCountries={['ru', 'by']}
          country='ua'
          regions={['europe']}
          autocompleteSearch
          dropdownClass='top-10 !rounded-lg !bg-base-100 md:!w-72 !w-[90vw]'
          buttonClass='!bg-transparent hover:!bg-transparent !border-none !outline-none !hover:bg-red-500'
          inputClass={cn(
            '!pl-12 !input !input-bordered !w-full !cursor-pointer !placeholder:text-base-200 !placeholder:text-opacity-45',
            error && '!border-red-600'
          )}
        />
      );
    }

    return (
      <input
        {...rest}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={cn(
          isTextType
            ? 'input input-bordered w-full cursor-pointer placeholder:text-base-200 placeholder:text-opacity-45'
            : className,
          error && 'border-red-600'
        )}
      />
    );
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
        {printInput()}
        {children}
      </div>
      {isLoading && (
        <span className='loading loading-dots loading-md absolute right-3 top-10 md:right-20 md:top-3 lg:right-3' />
      )}
      {error && (
        <span className={`relative text-xs text-red-600`}>{error}</span>
      )}
    </div>
  );
};
