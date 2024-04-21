'use client';

import React, { FC, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { FormProps } from '@/types/components';
import { processChild, toaster } from '@/lib';
import { useRouter } from 'next/navigation';

export const Form: FC<FormProps<any>> = ({
  children,
  className,
  action,
  state = {
    data: null,
    message: null,
    errors: null,
    strapiError: null,
    redirectUrl: null,
  },
}) => {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(action, state);

  useEffect(() => {
    if (!formState?.strapiError && !formState?.errors) {
      ref.current?.reset();

      if (formState.message) {
        toaster({ key: 'success', message: formState.message });
      }

      if (formState.redirectUrl) {
        router.push(formState.redirectUrl);
      }
    } else {
      toaster({
        key: 'error',
        message: formState.message,
        description: formState.strapiError?.message ?? formState.strapiError,
      });
    }
  }, [formState, router]);

  return (
    <form ref={ref} action={formAction} className={className}>
      {React.Children.map(children as React.ReactElement[], (child, index) =>
        processChild(child, index, formState)
      )}
    </form>
  );
};
