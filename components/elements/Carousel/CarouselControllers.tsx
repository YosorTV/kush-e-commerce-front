'use client';

import { FC } from 'react';
import { Button } from '../Button';
import { RxDividerVertical } from 'react-icons/rx';
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from 'react-icons/lia';
import { usePrevNextButtons, useScreen } from '@/lib/hooks';
import { EmblaCarouselType } from 'embla-carousel';

interface ICarouseControllers {
  emblaApi: EmblaCarouselType;
}

export const CarouselControllers: FC<ICarouseControllers> = ({ emblaApi }) => {
  const { lg } = useScreen();

  const size = lg ? 34 : 24;

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  // const handleButtonAutoplayClick = useCallback(
  //   (callback: () => void) => {
  //     const autoScroll = emblaApi?.plugins()?.autoScroll;

  //     const resetOrStop =
  //       autoScroll.options.stopOnInteraction === false
  //         ? autoScroll.reset
  //         : autoScroll.stop;

  //     resetOrStop();
  //     callback();
  //   },
  //   [emblaApi]
  // );

  return (
    <div className='embla__controls'>
      <div className='embla__buttons'>
        <Button
          className='embla__button embla__button--prev'
          type='button'
          onClick={onPrevButtonClick}
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
            transform: 'rotate(45deg)',
          }}
        />
        <Button
          className='embla__button embla__button--next'
          type='button'
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        >
          <LiaLongArrowAltRightSolid
            className='fill-base-300'
            style={{ width: size, height: size }}
          />
        </Button>
      </div>
    </div>
  );
};
