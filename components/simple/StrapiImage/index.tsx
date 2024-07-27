import { Image } from '@/components/elements';

import { cn } from '@/lib';
import { IStrapiImageProps } from '@/types/components/simple/strapiImage.types';

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
  formats,
  fill,
  loading,
  priority = false,
}: Readonly<IStrapiImageProps>) {
  const imageFallback = `https://placehold.co/${width}x${height}`;

  if (fill) {
    return (
      <Image
        src={src ?? imageFallback}
        alt={alt}
        formats={formats}
        fill={fill}
        priority
        fetchPriority='high'
        className={cn(className)}
      />
    );
  }

  return (
    <Image
      src={src ?? imageFallback}
      alt={alt}
      loading={loading}
      height={height as number}
      width={width as number}
      formats={formats && formats}
      priority={priority}
      className={cn(className)}
    />
  );
}
