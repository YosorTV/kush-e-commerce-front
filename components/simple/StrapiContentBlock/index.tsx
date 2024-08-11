'use client';

import { FC } from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

import { Blockquote, Title, NextLink } from '@/components/elements';

import { IStrapiContentBlock } from '@/types/components/simple';
import { StrapiImage } from '../StrapiImage';
import { cn } from '@/lib';

export const StrapiContentBlock: FC<IStrapiContentBlock> = ({ content, imageClass = 'h-full' }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        quote: ({ children }) => <Blockquote>{children}</Blockquote>,
        link: ({ children, url }) => <NextLink href={url}>{children}</NextLink>,
        heading: ({ level, children }) => <Title level={`${level}`}>{children}</Title>,
        image: ({ image }) => {
          return (
            <StrapiImage
              src={image.url}
              alt={image.alternativeText}
              loading='lazy'
              height={image.height}
              width={image.width}
              priority={false}
              formats={image?.formats}
              previewUrl={image?.previewUrl}
              className={cn('aspect-video w-full object-cover object-center-to-top', imageClass)}
            />
          );
        },
        paragraph: ({ children }) => <p className='break-words text-sm text-base-200 md:text-base'>{children}</p>,
      }}
    />
  );
};
