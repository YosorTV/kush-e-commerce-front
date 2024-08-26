'use client';

import { FC, PropsWithChildren } from 'react';

interface IRangeTrack {
  min: number;
  max: number;
  props: any;
}

export const RangeTrack: FC<PropsWithChildren<IRangeTrack>> = ({ props, children, min, max }) => {
  const { ref, ...rest } = props;

  return (
    <div className='relative h-2 w-full rounded-3xl bg-gray-500' ref={ref} {...rest}>
      <div
        className='absolute h-2 bg-base-300'
        style={{
          left: `${(min / 3000) * 100}%`,
          width: `${((max - min) / 3000) * 100}%`
        }}
      />
      {children}
    </div>
  );
};
