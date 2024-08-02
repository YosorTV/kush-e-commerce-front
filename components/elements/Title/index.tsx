import { FC, PropsWithChildren } from 'react';

import { ITitleProps } from '@/types/components';

export const Title: FC<PropsWithChildren<ITitleProps>> = ({
  level,
  className,
  children,
  ...rest
}) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag
      id={rest.id}
      className={className}
      title={children as string}
      aria-label={rest['aria-label']}
    >
      {children}
    </HeadingTag>
  );
};
