'use client';

import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { SCREEEN } from '@/helpers/constants';

import { debounce } from './utils';
import { getCurrency } from '@/services';

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

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  };
};

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (isLocked) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', preventScroll, { passive: false });
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', preventScroll);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', preventScroll);
    };
  }, [isLocked]);
};

export const useDebounce = (value: any, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useAutoScroll = (emblaApi: EmblaCarouselType, autoScroll: boolean) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!emblaApi || !autoScroll) return;

    const onAutoScroll = emblaApi?.plugins()?.autoScroll;

    setIsPlaying(onAutoScroll.isPlaying());

    const handlePlay = () => setIsPlaying(true);
    const handleStop = () => setIsPlaying(false);
    const handleReInit = () => setIsPlaying(onAutoScroll.isPlaying());

    emblaApi.on('autoScroll:play', handlePlay).on('autoScroll:stop', handleStop).on('reInit', handleReInit);

    if (!isPlaying) {
      onAutoScroll.play();
    }

    return () => {
      emblaApi.off('autoScroll:play', handlePlay).off('autoScroll:stop', handleStop).off('reInit', handleReInit);
    };
  }, [autoScroll, emblaApi, isPlaying]);
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState<number>(41);

  useEffect(() => {
    const fetchCurrency = async () => {
      const result = await getCurrency();
      setCurrency(result);
    };

    fetchCurrency();
  }, []);

  return currency;
};
