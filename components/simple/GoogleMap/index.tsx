'use client';

import { FC, memo, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { GoogleMap as GMap, InfoWindow, Marker } from '@react-google-maps/api';

import { MapProvider } from '@/components/providers/MapProvider';

import { CONFIG } from '@/lib';

import { IGoogleMap } from '@/types/components/complex';

const GoogleMap: FC<IGoogleMap> = ({ center, address }) => {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

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
        <Marker position={center} onClick={() => setIsInfoWindowOpen(true)} />
        {isInfoWindowOpen && (
          <InfoWindow
            position={center}
            onCloseClick={() => setIsInfoWindowOpen(false)}
            options={{ ariaLabel: 'Uluru' }}
          >
            <p className='p-2.5 text-base font-semibold text-slate-700'>{address}</p>
          </InfoWindow>
        )}
      </GMap>
    </MapProvider>
  );
};

export default memo(GoogleMap);
