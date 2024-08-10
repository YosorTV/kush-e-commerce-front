import { FC, PropsWithChildren } from 'react';
import { cn } from '@/lib';

import { IBlockquote } from '@/types/components/elements/blockquote.types';

export const Blockquote: FC<PropsWithChildren<IBlockquote>> = ({ children, className }) => {
  return (
    <blockquote className={cn('ml-2 border-l-2 border-gray-500 pl-2 text-sm text-base-200', className)}>
      {children}
    </blockquote>
  );
};
