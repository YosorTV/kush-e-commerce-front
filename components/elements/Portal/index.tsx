'use client';

import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { PortalProps } from '@/types/components';

export const Portal: FC<PortalProps> = ({ children, selector, show }) => {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  return show && ref.current ? createPortal(children, ref.current) : null;
};
