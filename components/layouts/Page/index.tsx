import { FC } from 'react';

import { cn } from '@/lib';
import { PageLayoutProps } from '@/types/components';
import { Image } from '@/components/elements';

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  className,
  cover,
}) => {
  return (
    <div className={cn('flex flex-grow flex-col overflow-hidden', className)}>
      {cover && cover.url && (
        <Image
          alt='Mountains'
          src={cover?.url}
          placeholder='blur'
          quality={100}
          fill
          sizes='100vw'
          style={{
            objectFit: 'cover',
          }}
        />
      )}
      {children}
    </div>
  );
};
