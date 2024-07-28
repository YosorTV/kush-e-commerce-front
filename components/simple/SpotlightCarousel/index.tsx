'use client';

import React, { FC, useCallback, useEffect, useState } from 'react';

import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

import { RxDividerVertical } from 'react-icons/rx';

import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from 'react-icons/lia';

import { Product } from '@/types/components';

import { cn } from '@/lib';
import { usePrevNextButtons, useScreen } from '@/lib/hooks';

import { cormorant } from '@/assets/fonts';
import { Button, CategoryCard, Title } from '@/components/elements';

type PropType = {
  data: Product[];
  title: string;
  options?: EmblaOptionsType;
};

export const SpotlightCarousel: FC<PropType> = ({
  data = [],
  title,
  options,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: false }),
  ]);

  const [isPlaying, setIsPlaying] = useState(false);

  const { lg } = useScreen();

  const size = !lg ? 24 : 34;

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());

    emblaApi
      .on('autoScroll:play', () => setIsPlaying(true))
      .on('autoScroll:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoScroll.isPlaying()));

    if (!isPlaying) {
      autoScroll.play();
    }
  }, [emblaApi, isPlaying]);

  const printSpotlightCard = (product: Product) => (
    <div className='embla__slide' key={product.id}>
      <div className='embla__slide__number'>
        <CategoryCard data={product} />
      </div>
    </div>
  );

  return (
    <div className='embla'>
      <div className='emble_header px-3 py-3 lg:px-6 lg:py-6'>
        <Title
          level='2'
          className={cn(
            'text-2xl uppercase text-white lg:text-5xl',
            cormorant.className
          )}
        >
          {title}
        </Title>
        <div className='embla__controls'>
          <div className='embla__buttons'>
            <Button
              className='embla__button embla__button--prev'
              type='button'
              onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
              disabled={prevBtnDisabled}
            >
              <LiaLongArrowAltLeftSolid
                className='fill-base-300'
                style={{ width: size, height: size }}
              />
            </Button>

            <RxDividerVertical
              style={{
                height: size,
                width: size,
                color: 'white',
                rotate: '45deg',
              }}
            />

            <Button
              className='embla__button embla__button--next'
              type='button'
              onClick={() => onButtonAutoplayClick(onNextButtonClick)}
              disabled={nextBtnDisabled}
            >
              <LiaLongArrowAltRightSolid
                className='fill-base-300'
                style={{ width: size, height: size }}
              />
            </Button>
          </div>
        </div>
      </div>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>{data.map(printSpotlightCard)}</div>
      </div>
    </div>
  );
};
