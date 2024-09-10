import { FC } from 'react';
import { NextLink } from '@/components/elements/Link';
import { ROOT } from '@/helpers/constants';
import { LogoIcon } from '@/assets/icons';

interface TLogo {
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export const Logo: FC<TLogo> = ({ className, width = 150, height = 42, onClick }) => {
  return (
    <NextLink href={ROOT} className={className} onClick={onClick}>
      <LogoIcon width={width} height={height} className='relative top-1 fill-base-200 p-2' />
    </NextLink>
  );
};
