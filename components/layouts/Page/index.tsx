import { FC } from 'react';

import { cn } from '@/lib';
import { PageLayoutProps } from '@/types/components';

export const PageLayout: FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('flex flex-grow flex-col overflow-x-hidden', className)}>
      {children}
    </div>
  );
};
