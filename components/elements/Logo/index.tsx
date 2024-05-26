import { FC } from 'react';
import { NextLink } from '@/components/elements/Link';
import { ROOT } from '@/helpers/constants';
import { LogoIcon } from '@/assets/icons';

export const Logo: FC = () => {
  return (
    <NextLink href={ROOT} className='absolute-center absolute'>
      <LogoIcon width={150} height={42} className='fill-base-200 p-1.5' />
    </NextLink>
  );
};
