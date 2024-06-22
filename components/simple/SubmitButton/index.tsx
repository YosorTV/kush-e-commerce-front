'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib';
import { Button } from '@/components/elements';
import { ReactNode, useMemo } from 'react';

function Loader({ text }: { readonly text?: string }) {
  return (
    <div className='flex items-center space-x-2'>
      <span className='loading loading-spinner loading-sm' />
      {text && <p>{text}</p>}
    </div>
  );
}

interface SubmitButtonProps {
  text?: string;
  icon?: ReactNode;
  loadingText?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export function SubmitButton({
  text,
  loadingText,
  loading,
  icon,
  disabled,
  className,
}: Readonly<SubmitButtonProps>) {
  const status = useFormStatus();

  const printButtonContent = useMemo(() => {
    if (status.pending || loading) {
      return icon ? <Loader /> : <Loader text={loadingText} />;
    }

    return icon || text;
  }, [icon, loading, loadingText, status.pending, text]);

  return (
    <Button
      type='submit'
      aria-disabled={status.pending || loading || disabled}
      disabled={status.pending || loading || disabled}
      className={cn(
        className,
        disabled && '!bg-gray-400 !opacity-50',
        icon !== null && 'animate-none border-none bg-transparent shadow-none'
      )}
    >
      {printButtonContent}
    </Button>
  );
}
