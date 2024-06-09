import { ImageProps } from '@/types/components';
import NextImage from 'next/image';
import { FC } from 'react';

export const Image: FC<ImageProps> = ({
  src,
  height = 100,
  width = 100,
  className,
  alt,
  priority = false,
  fill = false,
}) => {
  return (
    <NextImage
      fill={fill}
      src={src}
      height={height}
      width={width}
      className={className}
      alt={alt ?? 'image-element'}
      priority={priority}
    />
  );
};
