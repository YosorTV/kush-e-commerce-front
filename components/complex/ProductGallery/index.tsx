'use client';

import { Zoom } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import { ProductCarousel } from '@/components/simple/ProductCarousel';
import { getImgGrid } from '@/lib';
import { useScreen } from '@/lib/hooks';
import { useMemo } from 'react';

export const ProductGallery = ({ images = [], className }: { images: any[]; className?: string }) => {
  const { lg } = useScreen();
  const gallery = getImgGrid({ images });

  const printImage = (image: any) => {
    return (
      <li key={image.id} id={image.id} className='h-96 overflow-hidden'>
        <Zoom>
          <StrapiImage
            priority
            src={image.url}
            width={image.width}
            height={image.height}
            formats={image.formats}
            alt={image.alternativeText}
            className='h-full w-full cursor-pointer object-cover'
          />
        </Zoom>
      </li>
    );
  };

  const printGallery = useMemo(() => {
    if (lg) {
      return <ul className='grid gap-3 lg:grid-cols-1 xl:grid-cols-2'>{gallery.map(printImage)}</ul>;
    } else {
      return <ProductCarousel data={images} options={{ loop: true }} containerClass='lg:hidden' />;
    }
  }, [lg, gallery, images]);

  return (
    <section className={className} aria-label='Product gallery'>
      {printGallery}
    </section>
  );
};
