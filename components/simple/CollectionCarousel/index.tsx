'use client';

import { FC } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import { usePrevNextButtons } from '@/lib/hooks';
import { Button } from '@/components/elements';

import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from 'react-icons/lia';

import { RxDividerVertical } from 'react-icons/rx';
import { CollectionCard } from '../CollectionCard';
import { cn } from '@/lib';

type PropType = {
  data: any[];
  options?: EmblaOptionsType;
};

export const CollectionCarousel: FC<PropType> = ({ data, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={cn('embla_mini relative -top-4')}>
      <div className='embla_mini_controls'>
        <div className='embla_mini_buttons'>
          <Button
            type='button'
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          >
            <LiaLongArrowAltLeftSolid
              className='fill-base-200'
              style={{ width: 24, height: 24 }}
            />
          </Button>

          <RxDividerVertical
            className='fill-base-200'
            style={{
              height: 24,
              width: 24,
              rotate: '45deg',
            }}
          />

          <Button
            type='button'
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          >
            <LiaLongArrowAltRightSolid
              className='fill-base-200'
              style={{ width: 24, height: 24 }}
            />
          </Button>
        </div>
      </div>
      <div className='embla_mini_viewport' ref={emblaRef}>
        <div className='embla_mini_container pb-6'>
          {data.map(({ cover, slug, title }) => (
            <CollectionCard
              className='embla_mini_slide'
              key={slug}
              img={cover}
              slug={slug}
              title={title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
