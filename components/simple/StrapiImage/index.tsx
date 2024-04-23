import { Image } from '@/components/elements';
import { Artboard } from '@/components/elements/Artboard';
import { cn } from '@/lib';
import { getStrapiMedia } from '@/lib/utils';

interface StrapiImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width}x${height}`;

  if (!src) {
    return <Artboard className={className} width={width} height={height} />;
  }

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt}
      height={height}
      width={width}
      className={cn(className)}
    />
  );
}
