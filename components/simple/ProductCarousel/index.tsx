'use client';

import { FC } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import { usePrevNextButtons } from '@/lib/hooks';
import { Button, Zoom } from '@/components/elements';

import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from 'react-icons/lia';

import { RxDividerVertical } from 'react-icons/rx';
import { StrapiImage } from '../StrapiImage';
import { cn } from '@/lib';

type PropType = {
  data: any[];
  options?: EmblaOptionsType;
  containerClass: string;
};

export const ProductCarousel: FC<PropType> = ({ data, options, containerClass }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const printProductSlide = (image: any) => {
    return (
      <li key={image.id} className='embla__slide hover:cursor-grab active:cursor-grabbing'>
        <Zoom>
          <StrapiImage
            formats={image.formats}
            alt={image.alternativeText}
            src={image.url}
            height={image.height}
            width={image.width}
            className='h-80 object-cover'
          />
        </Zoom>
      </li>
    );
  };

  return (
    <div className={cn('embla-standart', containerClass)}>
      <div className='embla__controls justify-end px-6'>
        <div className='embla__buttons'>
          <Button type='button' onClick={onPrevButtonClick} disabled={prevBtnDisabled}>
            <LiaLongArrowAltLeftSolid className='h-6 w-6 fill-base-200' />
          </Button>
          <RxDividerVertical className='h-6 w-6 rotate-45 text-base-200' />
          <Button type='button' onClick={onNextButtonClick} disabled={nextBtnDisabled}>
            <LiaLongArrowAltRightSolid className='h-6 w-6 fill-base-200' />
          </Button>
        </div>
      </div>
      <div className='embla__viewport' ref={emblaRef}>
        <ul className='embla__container'>{data.map(printProductSlide)}</ul>
      </div>
    </div>
  );
};
