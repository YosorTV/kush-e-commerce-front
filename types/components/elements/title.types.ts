import { ReactNode } from 'react';

type HeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';

export type TitleProps = {
  className?: string;
  children: ReactNode;
  level: HeadingLevel;
};
