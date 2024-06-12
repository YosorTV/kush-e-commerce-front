import { cn } from '@/lib';
import { FC, Fragment } from 'react';

export const ProductCardSkeleton: FC<{
  length: number;
  customGrid: boolean;
}> = ({ length = 4, customGrid = true }) => {
  const gridCols = (index: number) => {
    if (index % 5 === 0)
      return 'col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1';
    if (index % 5 === 1)
      return 'col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1';
    if (index % 5 === 2)
      return 'col-span-1 lg:col-span-2 xl:col-span-1 xxl:col-span-2';
    if (index % 5 === 3) return 'col-span-1 xl:col-span-3 xxl:col-span-1';

    return 'col-span-1';
  };

  return Array.from({ length }, (_, index) => (
    <Fragment key={index}>
      <div
        className={cn(
          'col-span-1 flex w-full flex-col',
          customGrid && gridCols(index)
        )}
      >
        <div className='h-[480px] w-full animate-pulse bg-gray-500' />
        <div className='mt-2 h-4 w-1/2 animate-pulse bg-gray-500' />
        <div className='mt-4 h-2 w-1/3 animate-pulse bg-gray-500' />
        <div className='mt-2 h-2 w-1/12 animate-pulse bg-gray-500' />
      </div>
    </Fragment>
  ));
};
