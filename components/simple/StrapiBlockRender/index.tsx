import { FC } from 'react';
import { HeroSection } from '@/components/complex';

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

export const StrapiBlockRender: FC<any> = ({ data }) => {
  if (!data) return <p>No sections found</p>;

  return data.map(blockRenderer);
};
