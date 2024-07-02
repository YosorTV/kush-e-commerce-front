'use client';

import { Children, FC, ReactElement, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { cn, processChild, toaster } from '@/lib';

import { FormProps } from '@/types/components';
import { useRouter } from '@/lib/navigation';

export const Form: FC<FormProps<any>> = ({
  children,
  className,
  action,
  state = {
    data: null,
    url: null,
    message: null,
    errors: null,
    strapiError: null,
    status: null,
  },
}) => {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [formState, formAction] = useFormState(action, state);

  useEffect(() => {
    if (formState.status === 200) {
      toaster({ key: 'success', message: formState.message });
      ref.current.reset();
      if (formState.url) {
        router.push(formState.url);
      }
    } else if (formState.status === 400) {
      toaster({
        key: 'error',
        message: formState.message,
        description: formState.strapiError?.message ?? formState.strapiError,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <form ref={ref} action={formAction} className={cn(className)}>
      {Children.map(children as ReactElement[], (child, index) =>
        processChild(child, index, formState)
      )}
    </form>
  );
};
