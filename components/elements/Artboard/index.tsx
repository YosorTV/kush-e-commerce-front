import { FC } from 'react';
import { cn } from '@/lib';
import { ArtboardProps } from '@/types/components';

export const Artboard: FC<ArtboardProps> = ({ className, width, height }) => {
  return (
    <div
      className={cn(
        className,
        'artboard artboard-horizontal flex items-center justify-center'
      )}
    >
      <span className='flex h-5/6 w-5/6 items-center justify-center bg-white/50 font-thin text-black'>
        {width}×{height}
      </span>
    </div>
  );
};
