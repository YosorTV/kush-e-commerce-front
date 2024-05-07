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
    status: null,
  },
}) => {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(action, state);

  useEffect(() => {
    if (formState?.errors || formState.strapiError) {
      toaster({
        key: 'error',
        message: formState.message,
        description: formState.strapiError?.message ?? formState.strapiError,
      });
    }

    if (formState.status === 200) {
      toaster({ key: 'success', message: formState.message });
      ref.current?.reset();
    }

    if (formState.redirectUrl) {
      router.push(formState.redirectUrl);
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
