import { FC } from 'react';
import { notFound } from 'next/navigation';

import { HeroSection, SpotlightSection } from '@/components/complex';
import ProductsContent from '../ProductsContent';

function blockRenderer(block: any) {
  switch (block.__component) {
    case 'complex.hero-section':
      return <HeroSection key={block.id} data={block} />;
    case 'complex.spotlight':
      return <SpotlightSection key={block.id} data={block} />;
    case 'complex.products':
      return (
        <ProductsContent
          key={block.id}
          title={block.title}
          className='px-6 pt-0 lg:pt-14'
        />
      );
    default:
      return null;
  }
}

export const StrapiBlockRender: FC<any> = ({ data }) => {
  if (!data) return notFound();

  return data.map(blockRenderer);
};
