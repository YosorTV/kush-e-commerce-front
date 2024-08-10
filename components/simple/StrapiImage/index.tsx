import { Image } from '@/components/elements';

import { IStrapiImageProps } from '@/types/components/simple/strapiImage.types';

export function StrapiImage({
  id,
  src,
  alt,
  formats,
  loading,
  className,
  fill = false,
  height = 600,
  width = 600,
  priority = false,
  overlay = false,
}: Readonly<IStrapiImageProps>) {
  const imageFallback = `https://placehold.co/${width}x${height}`;

  return (
    <div className='relative h-full w-full'>
      {fill ? (
        <Image
          id={id}
          src={src ?? imageFallback}
          alt={alt}
          formats={formats}
          fill={fill}
          priority
          sizes='100vw'
          fetchPriority='high'
          className={className}
        />
      ) : (
        <Image
          id={id}
          src={src ?? imageFallback}
          alt={alt}
          loading={loading}
          height={height as number}
          width={width as number}
          formats={formats && formats}
          priority={priority}
          className={className}
        />
      )}
      {overlay && <div className='pointer-events-none absolute inset-0 z-0 bg-black/50' />}
    </div>
  );
}
