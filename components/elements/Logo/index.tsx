import { FC } from 'react';
import { NextLink } from '@/components/elements/Link';
import { ROOT } from '@/helpers/constants';
import { LogoIcon } from '@/assets/icons';

export const Logo: FC<{ className: string }> = ({
  className = 'absolute-center',
}) => {
  return (
    <NextLink href={ROOT} className={className}>
      <LogoIcon width={150} height={42} className='fill-base-200 p-1.5' />
    </NextLink>
  );
};
