import { FC } from 'react';

import { cn } from '@/lib';
import { PageLayoutProps } from '@/types/components';

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  className,
  cover,
}) => {
  const coverStyles = {
    backgroundImage: `url("${cover?.url}")`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      style={cover?.url && coverStyles}
      className={cn(
        'flex min-h-full flex-grow animate-fadeInUp flex-col overflow-x-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};
