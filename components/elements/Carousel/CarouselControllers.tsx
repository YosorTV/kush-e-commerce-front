'use client';

import { FC, useCallback } from 'react';
import { RxDividerVertical } from 'react-icons/rx';
import { EmblaCarouselType } from 'embla-carousel';
import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from 'react-icons/lia';

import { usePrevNextButtons, useScreen } from '@/lib/hooks';
import { Button } from '../Button';
import { cn } from '@/lib';
interface ICarouseControllers {
  emblaApi: EmblaCarouselType;
  autoplay?: boolean;
  autoScroll?: boolean;
  fill?: string;
}

export const CarouselControllers: FC<ICarouseControllers> = ({
  emblaApi,
  autoplay = false,
  autoScroll = false,
  fill = 'fill-base-200'
}) => {
  const { lg } = useScreen();

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const handleButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const scrollPlugin = emblaApi?.plugins()?.autoScroll;
      const autoplayPlugin = emblaApi?.plugins()?.autoplay;

      if (autoScroll) {
        const resetOrStop = scrollPlugin.options.stopOnInteraction === false ? scrollPlugin.reset : scrollPlugin.stop;
        resetOrStop();
        callback();
      } else {
        callback();
      }

      if (autoplay) {
        const resetOrStop =
          autoplayPlugin.options.stopOnInteraction === false ? autoplayPlugin.reset : autoplayPlugin.stop;
        resetOrStop();
        callback();
      } else {
        callback();
      }
    },
    [autoScroll, autoplay, emblaApi]
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
          <LiaLongArrowAltLeftSolid className={fill} style={{ width: size, height: size }} />
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
          <LiaLongArrowAltRightSolid className={fill} style={{ width: size, height: size }} />
        </Button>
      </div>
    </div>
  );
};
