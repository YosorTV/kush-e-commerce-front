'use client';

import React, { FC, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { FormProps, InputProps } from '@/types/components';
import { toaster } from '@/lib';

export const Form: FC<FormProps<any>> = ({
  children,
  className,
  action,
  state = {
    data: undefined,
    message: null,
    errors: null,
  },
}) => {
  const ref = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(action, state);

  useEffect(() => {
    if (!formState?.errors) {
      ref.current?.reset();
    }

    if (formState?.strapiError) {
      toaster({
        key: 'error',
        message: formState.message,
        description: formState.strapiError?.message ?? formState.strapiError,
      });
    }
  }, [formState]);

  return (
    <form ref={ref} action={formAction} className={className}>
      {React.Children.map(children, (child, index) => {
        return child.props?.name
          ? React.createElement<InputProps>(child.type, {
              ...{
                ...child?.props,
                key: `${child.props?.name}_${index}`,
                error: formState?.errors?.[child.props?.name] || null,
              },
            })
          : child;
      })}
    </form>
  );
};
