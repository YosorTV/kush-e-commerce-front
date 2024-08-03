import { Title } from '@/components/elements';
import { FC } from 'react';
import { FaRegClock, FaShippingFast } from 'react-icons/fa';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';

interface IRuleCard {
  icon: 'clock' | 'protect' | 'delivery';
  title: string;
  description: string;
}

type IIconType = { [key in IRuleCard['icon']]: JSX.Element };

export const RuleCard: FC<IRuleCard> = ({ icon, title, description }) => {
  const Icon: IIconType = {
    clock: (
      <FaRegClock className='h-10 w-10 fill-base-200 md:absolute md:top-2 xl:top-4' />
    ),
    protect: (
      <IoShieldCheckmarkOutline className='h-10 w-10 stroke-base-200 md:absolute md:top-2 xl:top-4' />
    ),
    delivery: (
      <FaShippingFast className='h-10 w-10 fill-base-200 md:absolute md:top-2 xl:top-4' />
    ),
  };

  return (
    <figure className='relative flex w-full items-center md:items-start'>
      {Icon[icon]}
      <figcaption className='ml-8 flex w-3/4 flex-col md:ml-16 md:w-full md:gap-y-2.5'>
        {title && (
          <Title
            level='3'
            className='!text-lg font-semibold text-base-200 md:text-2xl'
          >
            {title}
          </Title>
        )}
        {description && (
          <p className='hidden w-96 text-sm font-medium text-base-200 xl:flex'>
            {description}
          </p>
        )}
      </figcaption>
    </figure>
  );
};
