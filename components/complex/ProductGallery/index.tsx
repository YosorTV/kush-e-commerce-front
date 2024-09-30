'use client';

import { useMemo } from 'react';

import { StrapiImage, ProductCarousel } from '@/components/simple';

import { Zoom } from '@/components/elements';

import { getImgGrid } from '@/lib';

import { useScreen } from '@/lib/hooks';

export const ProductGallery = ({ images = [], className }: { images: any[]; className?: string }) => {
  const { lg } = useScreen();

  const gallery = getImgGrid({ images });

  const printImage = (image: any) => {
    return (
      <li key={image.id} id={image.id} className='h-full overflow-clip'>
        <Zoom>
          <StrapiImage
            priority
            src={image.url}
            width={image.width}
            height={image.height}
            formats={image.formats}
            alt={image.alternativeText}
            className='aspect-square h-full w-full cursor-pointer object-cover'
          />
        </Zoom>
      </li>
    );
  };

  const printGallery = useMemo(() => {
    if (lg) {
      return <ul className='grid w-full grid-cols-fluid gap-2.5 2xl:grid-cols-2'>{gallery.map(printImage)}</ul>;
    } else {
      return <ProductCarousel data={images} options={{ loop: true }} containerClass='lg:hidden w-svw' />;
    }
  }, [lg, gallery, images]);

  return (
    <section className={className} aria-label='Product gallery'>
      {printGallery}
    </section>
  );
};
