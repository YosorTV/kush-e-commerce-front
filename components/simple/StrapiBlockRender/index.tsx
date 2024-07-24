import { FC } from 'react';

import {
  CatalogSection,
  HeroSection,
  SpotlightSection,
  CollectionSection,
} from '@/components/complex';

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
          className='px-6 pt-0 lg:pt-5'
        />
      );
    case 'complex.collection-group':
      return <CollectionSection key={block.id} data={block} />;
    case 'complex.category-group':
      return <CatalogSection key={block.id} title={block.title} {...block} />;
    default:
      return null;
  }
}

export const StrapiBlockRender: FC<any> = ({ data = [] }) => {
  return data.map(blockRenderer);
};
