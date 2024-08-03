import { cormorant } from '@/assets/fonts';
import { Title } from '@/elements';
import { cn } from '@/lib';
import { FC } from 'react';

interface ICarouselTitle {
  title?: string;
  className?: string;
}

export const CarouselTitle: FC<ICarouselTitle> = ({ title, className }) => {
  return (
    <div className='emble_header'>
      <Title
        level='2'
        className={cn(
          'text-2xl uppercase xs:text-4xl lg:text-5xl',
          className,
          cormorant.className
        )}
      >
        {title}
      </Title>
    </div>
  );
};
