'use client';

import { SCREEEN } from '@/helpers/constants';
import { useEffect, useState } from 'react';
import { debounce } from './utils';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const updateMatches = () => {
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
    };

    const debouncedUpdate = debounce(updateMatches, 100);

    updateMatches();

    media.addEventListener('change', debouncedUpdate);

    return () => {
      media.addEventListener('change', debouncedUpdate);
    };
  }, [matches, query]);

  return matches;
};

export const useScreen = () => {
  const xs = useMediaQuery(SCREEEN.xs);
  const sm = useMediaQuery(SCREEEN.sm);
  const md = useMediaQuery(SCREEEN.md);
  const lg = useMediaQuery(SCREEEN.lg);
  const xl = useMediaQuery(SCREEEN.xl);
  const xxl = useMediaQuery(SCREEEN.xxl);

  return { xs, sm, md, lg, xl, xxl };
};
