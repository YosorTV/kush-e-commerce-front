import { FC } from 'react';
import { NextLink } from '@/components/elements/Link';
import { ROOT } from '@/helpers/constants';
import { LogoIcon } from '@/assets/icons';

interface TLogo {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: FC<TLogo> = ({
  className = 'absolute-center',
  width = 150,
  height = 42,
}) => {
  return (
    <NextLink href={ROOT} className={className}>
      <LogoIcon width={width} height={height} className='fill-base-200 p-1.5' />
    </NextLink>
  );
};
