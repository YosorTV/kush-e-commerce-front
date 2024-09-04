'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib';
import { Loader2 } from 'lucide-react';

function Loader({ text }: { readonly text: string }) {
  return (
    <div className='flex items-center space-x-2'>
      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      <p>{text}</p>
    </div>
  );
}

interface DeleteButtonProps {
  text: string;
  loadingText: string;
  className?: string;
  loading?: boolean;
  onClick: () => void;
}

export function DeleteButton({ text, loadingText, loading, className, onClick }: Readonly<DeleteButtonProps>) {
  const status = useFormStatus();

  return (
    <button
      type='button'
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
      onClick={onClick}
      className={cn('btn btn-error', className)}
    >
      {loading ? <Loader text={loadingText} /> : text}
    </button>
  );
}
