'use client';

import { FC } from 'react';
import { Path } from '../Path';

interface HamburgerProps {
  toggle: () => void;
}

export const Hamburger: FC<HamburgerProps> = ({ toggle }) => {
  return (
    <button onClick={toggle} className='relative top-[7px] z-30'>
      <svg width={24} height={24} viewBox='0 0 24 24'>
        <Path
          className='stroke-base-200'
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          className='stroke-base-200'
          d='M 2 9.423 L 20 9.423'
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          className='stroke-base-200'
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  );
};