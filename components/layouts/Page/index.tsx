import { FC } from 'react';

import { cn } from '@/lib';
import { PageLayoutProps } from '@/types/components';
import { StrapiImage } from '@/components/simple';

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  className,
  cover,
}) => {
  return (
    <div className={cn('flex flex-grow flex-col overflow-hidden', className)}>
      {cover && cover.url && (
        <StrapiImage
          alt={cover.alternativeText}
          src={cover?.url}
          formats={cover.formats}
          className='object-cover'
          fill
        />
      )}
      {children}
    </div>
  );
};
