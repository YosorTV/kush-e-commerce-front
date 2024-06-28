import { CSSProperties, FC } from 'react';

import { cn } from '@/lib';
import { PageLayoutProps } from '@/types/components';

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  className,
  cover,
}) => {
  const coverStyles: CSSProperties = {
    backgroundImage: `url("${cover?.url}")`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(4px)',
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: -1,
  };

  return (
    <div
      className={cn(
        'relative flex min-h-full flex-grow animate-fadeInUp flex-col overflow-hidden overflow-x-hidden',
        className
      )}
    >
      <div style={coverStyles} />
      {children}
    </div>
  );
};
