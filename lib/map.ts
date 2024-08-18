import { GoogleMapProps } from '@react-google-maps/api';

import GoogleDarkTheme from '@/public/GoogleMapDark.json';

export const CONFIG = (theme: string) => ({
  zoom: 15,
  styles: {
    width: '100%',
    height: '100%'
  },
  center: {
    lat: 35.8799866,
    lng: 76.5048004
  } as GoogleMapProps['center'],
  options: {
    tilt: 0,
    zoomControl: true,
    gestureHandling: 'auto',
    styles: theme === 'light' ? [] : GoogleDarkTheme
  } as GoogleMapProps['options']
});
