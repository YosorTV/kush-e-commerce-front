import { FC } from 'react';
import { HeroSection } from '@/components/complex';
import { notFound } from 'next/navigation';

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
  if (!data) return notFound();

  return data.map(blockRenderer);
};