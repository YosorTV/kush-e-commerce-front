'use client';

import { FC, useState, useMemo } from 'react';

import { useRouter } from '@/lib/navigation';

import { StrapiImage } from '../StrapiImage';
import { Product } from '@/types/components';
import { cn } from '@/lib';

interface TAnimatedImage {
  product: Product;
}

const AnimatedImage: FC<TAnimatedImage> = ({ product }) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const router = useRouter();

  const [img1, img2] = useMemo(() => {
    return product?.images?.data || [];
  }, [product.images.data]);

  const handleRedirect = () => {
    router.push(`/catalog/${product.slug}`);
  };

  if (!img1 && !img2) return null;

  return (
    <div
      aria-hidden
      onClick={handleRedirect}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
      className='relative h-80 sm:h-96 md:h-112'
    >
      {[img1, img2].map((img, idx) => (
        <div
          key={idx}
          className={cn(
            'absolute inset-0 h-full w-full transform-gpu transition-opacity duration-300 ease-in-out',
            showOverlay === (idx === 1) ? 'opacity-100' : 'opacity-0',
            product.quantity === 0 && 'grayscale filter'
          )}
        >
          <StrapiImage
            priority
            loading='eager'
            src={img?.url}
            formats={img?.formats}
            alt={img?.alternativeText}
            previewUrl={img?.previewUrl}
            width={img?.formats?.large?.width ?? 500}
            height={img?.formats?.large?.height ?? 500}
            className='h-full w-full object-cover'
          />
        </div>
      ))}
    </div>
  );
};

export default AnimatedImage;
