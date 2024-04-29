'use client';

import { FC, useEffect } from 'react';

import { Toaster } from 'sonner';

import { Hydrate } from '@/components/simple';
import { useTheme } from '@/store';

export const ClientSideRender: FC = () => {
  const themeStore = useTheme();

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', themeStore.theme);
  }, [themeStore.theme]);

  return (
    <Hydrate>
      <Toaster position='top-right' richColors closeButton />
    </Hydrate>
  );
};
