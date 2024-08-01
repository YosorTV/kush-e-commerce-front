'use client';

import { Children, FC, PropsWithChildren } from 'react';

import { cn } from '@/lib';
import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import Autoplay from 'embla-carousel-autoplay';

import { useAutoScroll } from '@/lib/hooks';
import useEmblaCarousel from 'embla-carousel-react';
import { CarouselTitle } from '@/elements/Carousel/CarouselTitle';
import { CarouselControllers } from './CarouselControllers';

interface EmblaCarouselProps {
  options?: EmblaOptionsType;
  autoScroll?: boolean;
  autoplay?: boolean;
  className?: string;
  title?: string;
}

const Carousel: FC<PropsWithChildren<EmblaCarouselProps>> = ({
  children,
  options,
  className,
  autoScroll = false,
  autoplay = false,
  title,
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
          'flex w-full items-center',
          title ? 'justify-between' : 'justify-end'
        )}
      >
        {title && <CarouselTitle title={title} />}
        <CarouselControllers emblaApi={emblaApi} />
      </div>
      <div className='embla__viewport py-3 lg:py-6' ref={emblaRef}>
        <div className='embla__container'>
          {Children.map(children, (child, index) => (
            <div
              className='embla__slide cursor-grab active:cursor-grabbing'
              key={index}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
