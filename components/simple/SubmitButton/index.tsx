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
}

export function SubmitButton({
  text,
  loadingText,
  loading,
  icon,
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
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
      className={cn(
        'btn shadow-none',
        icon
          ? 'animate-none border-none bg-transparent shadow-none'
          : 'btn-success',
        className
      )}
    >
      {printButtonContent}
    </Button>
  );
}
