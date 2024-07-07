'use client';

import { FC } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import { usePrevNextButtons } from '@/lib/hooks';
import { Button, Title } from '@/components/elements';

import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from 'react-icons/lia';

import { RxDividerVertical } from 'react-icons/rx';
import { CollectionCard } from '../CollectionCard';
import { cn } from '@/lib';
import { cormorant } from '@/assets/fonts';

type PropType = {
  data: any[];
  title?: string;
  mini: boolean;
  options?: EmblaOptionsType;
};

export const CollectionCarousel: FC<PropType> = ({
  data,
  title,
  mini = false,
  options,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const printCollectionCard = ({ cover, slug, title, hintText }: any) => {
    return (
      <CollectionCard
        key={slug}
        img={cover}
        slug={slug}
        title={title}
        hintText={hintText}
        className={cn(mini ? 'embla_mini_slide' : 'embla_collection_slide')}
        textClassName={cn(mini ? 'text-base-200' : 'text-base-300')}
      />
    );
  };

  return (
    <div className={cn(mini ? 'embla_mini' : 'embla_collection', 'relative')}>
      <div
        className={cn(
          mini ? 'embla_mini_controls' : 'embla_collection_controls py-5'
        )}
      >
        {title && (
          <Title
            level='2'
            className={cn(
              cormorant.className,
              'text-4xl uppercase tracking-wider text-base-300 lg:text-5xl'
            )}
          >
            {title}
          </Title>
        )}
        <div className='embla_collection_buttons'>
          <Button
            type='button'
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          >
            <LiaLongArrowAltLeftSolid
              className='fill-base-300'
              style={{ width: 24, height: 24 }}
            />
          </Button>

          <RxDividerVertical
            style={{
              height: 24,
              width: 24,
              color: '#fff',
              rotate: '45deg',
            }}
          />

          <Button
            type='button'
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          >
            <LiaLongArrowAltRightSolid
              className='fill-base-300'
              style={{ width: 24, height: 24 }}
            />
          </Button>
        </div>
      </div>
      <div
        className={cn(
          mini ? 'embla_mini_viewport' : 'embla_collection_viewport'
        )}
        ref={emblaRef}
      >
        <div
          className={cn(
            mini
              ? 'embla_mini_container pb-6'
              : 'embla_collection_container pb-12'
          )}
        >
          {data.map(printCollectionCard)}
        </div>
      </div>
    </div>
  );
};
