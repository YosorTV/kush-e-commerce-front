import { FC } from 'react';

import { TitleProps } from '@/types/components';

export const Title: FC<TitleProps> = ({ level, className, children }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={className} title={children as string}>
      {children}
    </HeadingTag>
  );
};
