'use client';

import { FC, PropsWithChildren } from 'react';

import ReactZoom from 'react-medium-image-zoom';

import 'react-medium-image-zoom/dist/styles.css';

export const Zoom: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReactZoom canSwipeToUnzoom={false} classDialog='react-zoom'>
      {children}
    </ReactZoom>
  );
};
