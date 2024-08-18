'use client';

import { FC, memo } from 'react';
import { GoogleMap as GMap, Marker } from '@react-google-maps/api';

import { CONFIG } from '@/lib';
import { MapProvider } from '@/components/providers/MapProvider';

import { IGoogleMap } from '@/types/components/complex';

const GoogleMap: FC<IGoogleMap> = ({ center }) => {
  return (
    <MapProvider>
      <GMap
        zoom={CONFIG.zoom}
        center={center ?? CONFIG.center}
        options={CONFIG.options}
        mapContainerStyle={CONFIG.styles}
      >
        <Marker position={center} />
      </GMap>
    </MapProvider>
  );
};

export default memo(GoogleMap);
