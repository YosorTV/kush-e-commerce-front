'use client';

import { FC, PropsWithChildren } from 'react';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places', 'drawing', 'geometry'];

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string,
    libraries: libraries as Libraries,
  });

  if (loadError) return <p>Encountered error while loading google maps</p>;

  if (!scriptLoaded) return <p>Map Script is loading ...</p>;

  return children;
};
