'use client';

import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { FC } from 'react';

import { Blockquote, NextLink, Title } from '@/components/elements';

import { cn } from '@/lib';
import { IStrapiContentBlock } from '@/types/components/simple';
import { StrapiImage } from '../StrapiImage';

export const StrapiContentBlock: FC<IStrapiContentBlock> = ({ content, imageClass = 'h-full' }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        quote: ({ children }) => <Blockquote>{children}</Blockquote>,
        link: ({ children, url }) => (
          <NextLink href={url} className='text-blue-500 underline-offset-2 hover:underline'>
            {children}
          </NextLink>
        ),
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
        paragraph: ({ children }) => <p className='break-words text-sm text-base-200 md:text-base'>{children}</p>
      }}
    />
  );
};
