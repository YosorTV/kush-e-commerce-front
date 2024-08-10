'use client';

import { FC } from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

import { Blockquote, Title, NextLink } from '@/components/elements';

import { IStrapiContentBlock } from '@/types/components/simple';

export const StrapiContentBlock: FC<IStrapiContentBlock> = ({ content }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        quote: ({ children }) => <Blockquote>{children}</Blockquote>,
        link: ({ children, url }) => <NextLink href={url}>{children}</NextLink>,
        heading: ({ level, children }) => <Title level={`${level}`}>{children}</Title>,
        paragraph: ({ children }) => <p className='break-words text-sm text-base-200 md:text-base'>{children}</p>,
      }}
    />
  );
};
