'use client';

import { FC, useCallback } from 'react';
import { RxDividerVertical } from 'react-icons/rx';
import { EmblaCarouselType } from 'embla-carousel';
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from 'react-icons/lia';

import { usePrevNextButtons, useScreen } from '@/lib/hooks';
import { Button } from '../Button';
import { cn } from '@/lib';
interface ICarouseControllers {
  emblaApi: EmblaCarouselType;
  autoplay?: boolean;
  fill?: string;
}

export const CarouselControllers: FC<ICarouseControllers> = ({
  emblaApi,
  autoplay = false,
  fill = 'fill-base-200',
}) => {
  const { lg } = useScreen();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const handleButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;

      if (autoplay) {
        const resetOrStop =
          autoScroll.options.stopOnInteraction === false
            ? autoScroll.reset
            : autoScroll.stop;
        resetOrStop();
        callback();
      } else {
        callback();
      }
    },
    [emblaApi]
  );

  const size = lg ? 28 : 24;

  return (
    <div className='embla__controls'>
      <div className='embla__buttons'>
        <Button
          className='embla__button embla__button--prev'
          type='button'
          onClick={() => handleButtonAutoplayClick(onPrevButtonClick)}
          disabled={prevBtnDisabled}
        >
          <LiaLongArrowAltLeftSolid
            className={fill}
            style={{ width: size, height: size }}
          />
        </Button>
        <RxDividerVertical
          className={cn('rotate-45', fill === 'fill-white' && 'text-white')}
          style={{ height: size, width: size }}
        />
        <Button
          className='embla__button embla__button--next'
          type='button'
          onClick={() => handleButtonAutoplayClick(onNextButtonClick)}
          disabled={nextBtnDisabled}
        >
          <LiaLongArrowAltRightSolid
            className={fill}
            style={{ width: size, height: size }}
          />
        </Button>
      </div>
    </div>
  );
};
