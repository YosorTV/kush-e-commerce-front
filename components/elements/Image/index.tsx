import { ImageProps } from '@/types/components';
import NextImage from 'next/image';
import { FC } from 'react';

export const Image: FC<ImageProps> = ({
  src,
  height = 100,
  width = 100,
  className,
  alt,
}) => {
  return (
    <NextImage
      src={src}
      height={height}
      width={width}
      className={className}
      alt={alt}
    />
  );
};
