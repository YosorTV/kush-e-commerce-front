import { FC } from 'react';

import { cn } from '@/lib';
import { InputProps } from '@/types/components';

const textInputTypes = (type: HTMLInputElement['type']) => {
  const customTypesStyles = ['radio', 'checkbox', 'range', 'file', 'date'];

  return !customTypesStyles.includes(type);
};

export const InputDefault: FC<InputProps> = ({ id, name, type, placeholder, className, error, ...rest }) => {
  const isTextType = textInputTypes(type);

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={cn(
        isTextType
          ? 'input input-bordered w-full cursor-pointer disabled:input-bordered placeholder:text-gray-500 disabled:bg-base-100 disabled:opacity-50'
          : className,
        error && 'border-error'
      )}
      {...rest}
    />
  );
};
