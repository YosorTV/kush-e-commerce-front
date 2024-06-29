'use client';

import { ChangeEvent, FC, useState } from 'react';

import { useTranslations } from 'next-intl';

import { cn } from '@/lib';
import { InputProps } from '@/types/components';

export const InputPassword: FC<InputProps> = ({
  id,
  className,
  validation,
  error,
  ...rest
}) => {
  const t = useTranslations('validation');
  const [password, setPassword] = useState('');

  const [isValid, setIsValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setIsValid({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  console.log(useTranslations('validation'));

  const allValid = Object.values(isValid).every(Boolean);

  const errorClass = `${password === '' ? '' : allValid ? 'input-success' : 'input-error'}`;

  const hintClassName = (condition: boolean) =>
    password === ''
      ? 'text-gray-400'
      : condition
        ? 'text-success'
        : 'text-error';

  return (
    <div className={cn('form-control w-full', className)}>
      <input
        {...rest}
        type='password'
        className={`input input-bordered ${errorClass || (error && 'input-error')}`}
        value={password}
        onChange={handleChange}
      />
      {validation && (
        <ul className='list-inside pt-5 text-sm'>
          <li
            className={cn(
              hintClassName(isValid.length),
              error && !isValid.length && 'text-error'
            )}
          >
            <sup>*</sup>
            {t('length', { number: 8 })}
          </li>
          <li
            className={cn(
              hintClassName(isValid.uppercase),
              error && !isValid.uppercase && 'text-error'
            )}
          >
            <sup>*</sup>
            {t('uppercase', { number: 1 })}
          </li>
          <li
            className={cn(
              hintClassName(isValid.lowercase),
              error && !isValid.lowercase && 'text-error'
            )}
          >
            <sup>*</sup>
            {t('lowercase', { number: 1 })}
          </li>
          <li
            className={cn(
              hintClassName(isValid.number),
              error && !isValid.number && 'text-error'
            )}
          >
            <sup>*</sup>
            {t('number', { number: 1 })}
          </li>
          <li
            className={cn(
              hintClassName(isValid.specialChar),
              error && !isValid.specialChar && 'text-error'
            )}
          >
            <sup>*</sup>
            {t('special', { number: 1 })}
          </li>
        </ul>
      )}
    </div>
  );
};
