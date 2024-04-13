import { HeroSection } from '@/components/complex';
import React from 'react';

function blockRenderer(block: any) {
  switch (block.__component) {
    case 'layouts.hero-section':
      return <HeroSection key={block.id} data={block} />;
    case 'layouts.features-section':
      return null;
    default:
      return null;
  }
}

export const StrapiBlockRender = ({ data }: any) => {
  if (!data) return <p>No sections found</p>;

  return data.map(blockRenderer);
};
