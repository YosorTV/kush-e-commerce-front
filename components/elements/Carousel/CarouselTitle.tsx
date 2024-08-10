import { FC } from 'react';

import { Title } from '@/elements';

interface ICarouselTitle {
  title?: string;
  className?: string;
}

export const CarouselTitle: FC<ICarouselTitle> = ({ title, className }) => {
  return (
    <div className='emble_header'>
      <Title level='2' variant='subheading' className={className}>
        {title}
      </Title>
    </div>
  );
};
