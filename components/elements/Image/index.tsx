'use client';

import { cn } from '@/lib';
import { IImageProps } from '@/types/components';
import NextImage from 'next/image';
import { FC, useState } from 'react';

export const Image: FC<IImageProps> = ({
  src,
  height = 100,
  width = 100,
  className,
  alt,
  priority = false,
  fill = false,
  formats,
  loading,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const blurDataURL = formats?.thumbnail?.url;

  if (fill) {
    return (
      <NextImage
        quality={100}
        sizes='100vw'
        src={src}
        fill={fill}
        priority={priority}
        placeholder='blur'
        blurDataURL={blurDataURL}
        alt={alt ?? 'image'}
        className={cn(className, 'image-blur', { 'image-loaded': isLoaded })}
        onLoad={() => setIsLoaded(true)}
      />
    );
  }

  return (
    <NextImage
      src={src}
      height={height}
      width={width}
      placeholder='blur'
      blurDataURL={blurDataURL}
      className={cn(className, 'image-blur', { 'image-loaded': isLoaded })}
      onLoad={() => setIsLoaded(true)}
      alt={alt ?? 'image'}
      priority={priority}
      quality={75}
      loading={loading}
    />
  );
};
