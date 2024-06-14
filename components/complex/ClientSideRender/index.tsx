'use client';

import { FC } from 'react';

import { Toaster } from 'sonner';

export const ClientSideRender: FC = () => {
  return <Toaster position='bottom-right' richColors closeButton />;
};
