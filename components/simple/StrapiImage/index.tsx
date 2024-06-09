import { Image } from '@/components/elements';

import { cn } from '@/lib';
import { getStrapiMedia } from '@/lib/utils';
import { ImageProps } from 'next/image';

interface StrapiImageProps extends ImageProps {
  className?: string;
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
  priority = false,
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src as string);
  const imageFallback = `https://placehold.co/${width}x${height}`;

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt}
      height={height as number}
      width={width as number}
      priority={priority}
      className={cn(className)}
    />
  );
}
