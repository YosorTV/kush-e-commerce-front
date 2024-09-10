'use client';

import { FC, useState } from 'react';

import { StrapiImage } from '../StrapiImage';
import { Product } from '@/types/components';
import { cn } from '@/lib';

interface TAnimatedImage {
  product: Product;
}

export const AnimatedImage: FC<TAnimatedImage> = ({ product }) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleShowOverlay = () => setShowOverlay(true);
  const handleHideOverlay = () => setShowOverlay(false);

  const getImage = ({ idx = 0 }: { idx: number }) => {
    return product?.images && product?.images.data.length > 0 && product?.images.data?.[idx];
  };

  const img1 = getImage({ idx: 0 });
  const img2 = getImage({ idx: 1 });

  return (
    <div
      onMouseEnter={handleShowOverlay}
      onMouseLeave={handleHideOverlay}
      className={cn('relative h-96 drop-shadow-xl md:h-112')}
    >
      <div
        className={`absolute left-0 top-0 h-full w-full transition-opacity duration-500 ${
          showOverlay ? 'z-1 opacity-0' : 'z-2 opacity-100'
        }`}
      >
        <StrapiImage
          loading='lazy'
          formats={img1.formats}
          height={img1?.formats?.large?.height ?? 500}
          width={img1?.formats?.large?.width ?? 500}
          previewUrl={img1?.previewUrl}
          src={img1?.url}
          alt={img1?.alternativeText}
          className='aspect-square h-full w-full object-cover'
        />
      </div>
      <div
        className={`absolute left-0 top-0 h-full w-full transition-opacity duration-500 ${
          showOverlay ? 'z-2 opacity-100' : 'z-1 opacity-0'
        }`}
      >
        <StrapiImage
          loading='lazy'
          height={img2?.formats?.large?.height ?? 500}
          width={img2?.formats?.large?.width ?? 500}
          src={img2?.url}
          alt={img2?.alternativeText}
          previewUrl={img2?.previewUrl}
          formats={img2?.formats}
          className='aspect-square h-full w-full object-cover'
        />
      </div>
    </div>
  );
};
