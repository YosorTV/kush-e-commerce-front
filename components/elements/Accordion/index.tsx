'use client';

import { FC, useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

import { Title } from '../Title';
import { animAccordion } from '@/assets/animations';
import { IAccordion, TAccordionItem } from '@/types/components';

import { BiPlus, BiMinus } from 'react-icons/bi';

export const Accordion: FC<IAccordion> = ({ data }) => {
  const t = useTranslations('filter');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = useCallback(
    (index: number) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    },
    [expandedIndex]
  );

  const printAccordion = useCallback(
    (item: TAccordionItem, index: number) => {
      return (
        <div key={index} className='border-b border-base-200 pt-4 first:pt-0'>
          <div
            className='flex w-full cursor-pointer justify-between py-2'
            onClick={() => handleToggle(index)}
          >
            <Title level='2' className='text-xl font-semibold text-base-200'>
              {t(item.title)}
            </Title>
            <AnimatePresence mode='wait' initial={false}>
              {expandedIndex === index ? (
                <BiMinus className='h-6 w-6 fill-base-200' />
              ) : (
                <BiPlus className='h-6 w-6 fill-base-200' />
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence mode='wait' initial={false}>
            {expandedIndex === index && (
              <motion.div
                className='overflow-hidden'
                key={expandedIndex}
                initial='collapsed'
                animate='open'
                exit='collapsed'
                variants={animAccordion}
              >
                <div className='pb-4 pt-2'>{item.component}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    },
    [expandedIndex, handleToggle, t]
  );

  return <div className='overflow-hidden py-5'>{data.map(printAccordion)}</div>;
};
