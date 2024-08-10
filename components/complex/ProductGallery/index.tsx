'use client';

import { StrapiImage } from '@/components/simple';
import { ProductCarousel } from '@/components/simple/ProductCarousel';
import { getImgGrid } from '@/lib';
import { useScreen } from '@/lib/hooks';

export const ProductGallery = ({ images = [], className }: { images: any[]; className?: string }) => {
  const gallery = getImgGrid({ images });

  const { lg } = useScreen();

  const printImage = (image: any) => {
    return (
      <li key={image.id} id={image.id} className='h-96 overflow-hidden'>
        <StrapiImage
          priority
          src={image.url}
          width={image.width}
          height={image.height}
          formats={image.formats}
          alt={image.alternativeText}
          className='h-full w-full object-cover'
        />
      </li>
    );
  };

  return (
    <section className={className} aria-label='Product gallery'>
      {lg && <ul className='grid gap-3 lg:grid-cols-1 xl:grid-cols-2'>{gallery.map(printImage)}</ul>}
      <ProductCarousel data={images} options={{ loop: true }} />
    </section>
  );
};
