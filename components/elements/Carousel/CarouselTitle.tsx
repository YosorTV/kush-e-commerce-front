import { cormorant } from '@/assets/fonts';
import { Title } from '@/elements';
import { cn } from '@/lib';
import { FC } from 'react';

interface ICarouselTitle {
  title?: string;
}

export const CarouselTitle: FC<ICarouselTitle> = ({ title }) => {
  return (
    <div className='emble_header pt-3 lg:pt-6'>
      <Title
        level='2'
        className={cn(
          'pt- text-2xl uppercase text-white xs:text-4xl lg:text-5xl',
          cormorant.className
        )}
      >
        {title}
      </Title>
    </div>
  );
};
