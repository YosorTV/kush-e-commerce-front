'use client';

import { FC, ReactNode, useEffect, useState } from 'react';

type HydrateProps = {
  children: ReactNode;
  loader?: ReactNode | null;
};

export const Hydrate: FC<HydrateProps> = ({ children, loader = null }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? children : loader;
};
