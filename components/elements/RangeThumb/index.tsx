'use client';

import { FC } from 'react';

interface IRangeThumb {
  props: any;
}

export const RangeThumb: FC<IRangeThumb> = ({ props }: any) => {
  const { key, ref, ...rest } = props;
  return (
    <div
      key={key}
      ref={ref}
      className='flex h-4 w-4 items-center justify-center rounded-full border drop-shadow-xl'
      style={{ ...props.style }}
      {...rest}
    >
      <span className='block h-full w-full rounded-full bg-neutral' />
    </div>
  );
};
