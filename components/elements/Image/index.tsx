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
  sizes = '(max-width:768px) 50vw, (max-width:968px) 70vw, (max-width:1200px) 100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const blurDataURL = formats?.thumbnail?.url;

  if (fill) {
    return (
      <NextImage
        quality={75}
        sizes={sizes}
        src={src}
        fill={fill}
        priority={priority}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={formats && blurDataURL}
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
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={formats && blurDataURL}
      className={cn(className, 'image-blur', { 'image-loaded': isLoaded })}
      onLoad={() => setIsLoaded(true)}
      alt={alt ?? 'image'}
      priority={priority}
      quality={75}
      loading={loading}
    />
  );
};
