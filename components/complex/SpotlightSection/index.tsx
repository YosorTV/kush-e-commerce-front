'use client';

import { FC, useEffect, useState } from 'react';
import { Card, Title } from '@/components/elements';
import useMeasure from 'react-use-measure';
import { animate, motion, useMotionValue } from 'framer-motion';
import { cn } from '@/lib';
import { cormorant } from '@/assets/fonts';

const AVG_DURATION = 75;
const SLOW_DURATION = 360000;

export const SpotlightSection: FC<any> = ({ data }) => {
  const [duration, setDuration] = useState<number>(AVG_DURATION);
  const [finished, setFinished] = useState<boolean>(false);
  const [rerender, setReRender] = useState<boolean>(false);

  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue<number>(0);

  useEffect(() => {
    let controls;
    let finalPositon = -width / 2 - 10;

    if (finished) {
      controls = animate(xTranslation, [xTranslation.get(), finalPositon], {
        ease: 'linear',
        duration: duration * (1 - xTranslation.get() / finalPositon),
        onComplete: () => {
          setFinished(false);
          setReRender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPositon], {
        ease: 'linear',
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [duration, finished, rerender, width, xTranslation]);

  const handleHoverStart = () => {
    setFinished(true);
    setDuration(SLOW_DURATION);
  };

  const handleHoverEnd = () => {
    setFinished(true);
    setDuration(AVG_DURATION);
  };

  const printProducts = (product: any, index: number) => (
    <Card key={index} data={product} />
  );

  return (
    <section className='relative flex h-[700px] flex-col bg-neutral p-6 lg:h-[900px]'>
      <Title
        level='2'
        className={cn(
          'text-center text-5xl uppercase text-white lg:text-start',
          cormorant.className
        )}
      >
        {data.title}
      </Title>
      <motion.div
        className='absolute left-0 top-24 flex pt-5'
        ref={ref}
        style={{ x: xTranslation }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {[...data.products.data, ...data.products.data].map(printProducts)}
      </motion.div>
    </section>
  );
};