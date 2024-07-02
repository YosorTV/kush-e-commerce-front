'use client';

import { ChangeEvent, FC, useMemo, useState } from 'react';

import { cn } from '@/lib';

import { PasswordValidation } from '@/components/simple';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {
  passwordValidationParams,
  passwordValidationRules,
} from '@/helpers/constants';

import { InputProps } from '@/types/components';
import { Button } from '../Button';

type InputTypeState = {
  type: 'password' | 'text';
  toggle: boolean;
  value: string;
};

export const InputPassword: FC<InputProps> = ({
  id,
  className,
  validation = false,
  error,
  ...rest
}) => {
  const [state, setState] = useState<InputTypeState>({
    type: 'password',
    toggle: true,
    value: '',
  });

  const [isValid, setIsValid] = useState(passwordValidationParams);

  const rules = [
    { condition: isValid.length, key: 'length', number: 8 },
    { condition: isValid.uppercase, key: 'uppercase', number: 1 },
    { condition: isValid.lowercase, key: 'lowercase', number: 1 },
    { condition: isValid.number, key: 'number', number: 1 },
    { condition: isValid.special, key: 'special', number: 1 },
  ];

  const iconType = {
    password: <FaEye className='h-6 w-6 fill-base-200' />,
    text: <FaEyeSlash className='h-6 w-6 fill-base-200' />,
  };

  const passedValidation = Object.values(isValid).every(Boolean);

  const errorClass = useMemo(() => {
    if (!state.value && !error) return '';
    else if (error) return 'input-error';
    else if (!passedValidation && validation) return 'input-error';
    else if (passedValidation && validation) return 'input-success';
    else return '';
  }, [state.value, error, passedValidation, validation]);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, value: target.value }));
    setIsValid(passwordValidationRules(target.value));
  };

  const handleToggle = () =>
    setState((prevState) => ({
      ...prevState,
      type: prevState.toggle ? 'password' : 'text',
      toggle: !prevState.toggle,
    }));

  return (
    <div className={cn('form-control w-full', className)}>
      <div className='relative flex w-full flex-auto justify-between'>
        <input
          type={state.type}
          autoComplete='current-password'
          value={state.value}
          onChange={handleChange}
          className={cn(
            'input input-bordered w-full placeholder:text-gray-500',
            errorClass
          )}
          {...rest}
        />
        <Button
          type='button'
          className='absolute right-2 z-10'
          onClick={handleToggle}
          icon={{ after: iconType[state.type] }}
        />
      </div>
      {validation && (
        <PasswordValidation
          error={error}
          rules={rules}
          password={state.value}
          validation={validation}
        />
      )}
    </div>
  );
};
