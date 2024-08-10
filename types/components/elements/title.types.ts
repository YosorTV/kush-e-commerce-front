import { HTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { title } from '@/lib/tailwind/variants/title';

export type ITitleSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl';
export type IHeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';

export type ITitle = ITitleProps & VariantProps<typeof title>;

export type THeadingTag = `h1` | `h2` | `h3` | `h4` | `h5` | `h6`;
export interface ITitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level: IHeadingLevel;
}
