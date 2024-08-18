'use client';

import { FC, memo, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { GoogleMap as GMap, Marker } from '@react-google-maps/api';

import { MapProvider } from '@/components/providers/MapProvider';

import { CONFIG } from '@/lib';

import { IGoogleMap } from '@/types/components/complex';

const GoogleMap: FC<IGoogleMap> = ({ center }) => {
  const { theme } = useTheme();

  const params = useMemo(() => {
    return CONFIG(theme);
  }, [theme]);

  return (
    <MapProvider>
      <GMap
        zoom={params.zoom}
        options={params.options}
        center={center ?? params.center}
        mapContainerStyle={params.styles}
      >
        <Marker position={center} />
      </GMap>
    </MapProvider>
  );
};

export default memo(GoogleMap);
