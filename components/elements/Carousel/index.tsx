'use client';

import { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib';
import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import Autoplay from 'embla-carousel-autoplay';

import { useAutoScroll } from '@/lib/hooks';
import useEmblaCarousel from 'embla-carousel-react';
import { CarouselTitle } from '@/elements/Carousel/CarouselTitle';
import { CarouselControllers } from '@/elements/Carousel/CarouselControllers';

interface EmblaCarouselProps {
  title?: string;
  options?: EmblaOptionsType;
  className?: string;
  autoScroll?: boolean;
  autoplay?: boolean;
  titleClass?: string;
  slideClass?: string;
}

const Carousel: FC<PropsWithChildren<EmblaCarouselProps>> = ({
  title,
  options,
  children,
  className,
  autoScroll = false,
  autoplay = false,
  titleClass = 'text-base-300',
}) => {
  const plugins = [
    autoScroll && AutoScroll({ playOnInit: false, stopOnMouseEnter: true }),
    autoplay && Autoplay({ delay: 1000, stopOnMouseEnter: true }),
  ].filter(Boolean);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  useAutoScroll(emblaApi, autoScroll);

  return (
    <div className={cn('embla', className)}>
      <div
        className={cn(
          'flex w-full items-baseline',
          title ? 'justify-between' : 'justify-end'
        )}
      >
        {title && <CarouselTitle title={title} className={titleClass} />}
        <CarouselControllers emblaApi={emblaApi} />
      </div>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>{children}</div>
      </div>
    </div>
  );
};

export default Carousel;