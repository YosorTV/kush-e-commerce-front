import { getInitials } from '@/helpers/formatters';
import { FC } from 'react';

interface IAvatar {
  firstName: string;
  lastName: string;
}

export const Avatar: FC<IAvatar> = ({ firstName, lastName }) => {
  const sign = getInitials({ firstName, lastName });

  return (
    <figure className='flex h-6 w-6 items-center justify-center rounded-full bg-neutral p-5 text-base font-semibold text-white'>
      {sign}
    </figure>
  );
};
