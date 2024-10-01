'use client';

import { Children, FC, ReactElement, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { processChild, toaster } from '@/lib';

import { FormProps } from '@/types/components';
import { useRouter } from '@/lib/navigation';

import { debounce } from 'lodash';

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
    status: null
  }
}) => {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [formState, formAction] = useFormState(action, state);

  const debouncedPush = debounce((url) => router.push(url), 300);

  useEffect(() => {
    if (formState?.status === 200) {
      ref.current.reset();
      if (formState?.url) {
        router.refresh();
        debouncedPush(formState?.url);
      }

      toaster({ key: 'success', message: formState.message });
    } else if (formState?.status === 400) {
      toaster({
        key: 'error',
        message: formState.message,
        description: formState.strapiError?.message ?? formState.strapiError
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <form ref={ref} action={formAction} className={className}>
      {Children.map(children as ReactElement[], (child, index) => processChild(child, index, formState))}
    </form>
  );
};
