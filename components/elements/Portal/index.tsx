'use client';

import { PortalProps } from '@/types/components';
import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Portal: FC<PortalProps> = ({ children, selector }) => {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  return ref.current ? createPortal(children, ref.current) : null;
};
