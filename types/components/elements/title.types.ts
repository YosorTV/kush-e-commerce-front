import { HTMLAttributes } from 'react';

type HeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';

export interface ITitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
}
