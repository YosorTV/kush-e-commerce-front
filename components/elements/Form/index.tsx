'use client';

import { Children, FC, ReactElement, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { FormProps } from '@/types/components';
import { cn, processChild, toaster } from '@/lib';

export const Form: FC<FormProps<any>> = ({
  children,
  className,
  action,
  state = {
    data: null,
    message: null,
    errors: null,
    strapiError: null,
    status: null,
  },
}) => {
  const ref = useRef<HTMLFormElement>(null);

  const [formState, formAction] = useFormState(action, state);

  useEffect(() => {
    if (formState?.errors || formState?.strapiError) {
      toaster({
        key: 'error',
        message: formState.message,
        description: formState.strapiError?.message ?? formState.strapiError,
      });
    }

    if (formState?.status === 200) {
      toaster({ key: 'success', message: formState?.message });
      ref.current.reset();
    }
  }, [formState]);

  const errorClass = formState?.errors
    ? '!top-10 md:!top-14'
    : 'top-32 md:top-28';

  return (
    <form ref={ref} action={formAction} className={cn(className, errorClass)}>
      {Children.map(children as ReactElement[], (child, index) =>
        processChild(child, index, formState)
      )}
    </form>
  );
};
