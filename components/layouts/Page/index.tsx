import { FC } from 'react';

// import { ClientSideRender } from '@/components';
import { cn } from '@/lib';

export const PageLayout: FC<any> = ({ children, className }) => {
  return (
    <div className={cn(className)}>
      {children}
      {/* <ClientSideRender /> */}
    </div>
  );
};
